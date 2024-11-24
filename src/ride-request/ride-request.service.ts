import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/entities/location.entity';
import { RideRequest } from 'src/entities/ride-request.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRideRequestDto } from './ride-request.dto';
import { Driver } from "../entities/drivers.entity";
import { UserService } from 'src/user/user.service';

@Injectable()
export class RideRequestService {
  private readonly logger = new Logger(RideRequestService.name);

  constructor(
    @InjectRepository(RideRequest)
    private readonly rideRequestRepository: Repository<RideRequest>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    private readonly userService: UserService,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  public async create(data: CreateRideRequestDto) {
    const { startLocation, endLocation, passanger_id } = data;
    this.logger.log({
      message: 'Saving ride request to database',
      passanger_id,
    });

    const createdStartLocation = this.locationRepository.create(startLocation);
    const createdEndLocation = this.locationRepository.create(endLocation);

    await this.locationRepository.save(createdStartLocation);
    await this.locationRepository.save(createdEndLocation);

    const passanger = await this.userService.get(passanger_id);
    if (!passanger) {
      this.logger.log({
        message: 'Passanger was not found by id',
        passanger_id,
      });
      throw new NotFoundException('Passanger was not found by id');
    }

    const rideRequest = this.rideRequestRepository.create({
      passanger,
      pickupLocation: createdStartLocation,
      dropoffLocation: createdEndLocation,
      requestedTime: new Date(),
      status: 'pending',
      tarrif: data.tarrif,
      cost: data.cost
    });
    this.logger.log({
      message: 'Ride request was saved successfully',
      ride_request_id: rideRequest.id,
    });

    return this.rideRequestRepository.save(rideRequest);
  }

  public async softDelete(id: string): Promise<void> {
    this.logger.log({
      message: 'Soft deleting ride request by ID',
      ride_request_id: id,
    });
    await this.rideRequestRepository.softDelete(id);
  }
}

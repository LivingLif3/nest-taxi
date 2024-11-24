import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rides } from 'src/entities/rides.entity';
import { Repository } from 'typeorm';
import { CreateRidesDto } from './rides.dto';
import { RideRequestService } from 'src/ride-request/ride-request.service';

@Injectable()
export class RidesService {
    private readonly logger = new Logger(RidesService.name);

    constructor(
        @InjectRepository(Rides) private readonly ridesRepository: Repository<Rides>,
        private readonly ridesRequestService: RideRequestService,
    ) {}

    public async create(createRidesDto: CreateRidesDto) {
        this.logger.log({
            message: 'Saving ride to database',
            driver_id: createRidesDto.driver.id,
        });

        const { driver, rideRequest } = createRidesDto;
        const ride = this.ridesRepository.create({
            driver: driver,
            status: 'going',
            startLocation: rideRequest.pickupLocation,
            endLocation: rideRequest.dropoffLocation,
            passanger: rideRequest.passanger,
            startTime: new Date(),
            endTime: new Date(),
            cost: createRidesDto.rideRequest.cost,
        });

        await this.ridesRepository.insert(ride);
        await this.ridesRequestService.softDelete(createRidesDto.rideRequest.id);

        this.logger.log({
            message: 'Ride was successfully saved',
            ride_id: ride.id
        });
        return ride;
    }

    public async completeRide(id: string) {
        const foundRide = await this.get(id);
        return this.ridesRepository.save({
            ...foundRide,
            endTime: new Date(),
            status: 'completed'
        });
    }

    public async get(id: string) {
        this.logger.log({
            message: 'Fetching ride by id',
            ride_id: id,
        });
        const ride = await this.ridesRepository.findOneBy({ id });
        if (!ride) {
            this.logger.log({
                message: 'Ride was not found by ID',
                ride_id: id,
            });
            throw new NotFoundException('Ride was not found by ID');
        }
        return ride;
    }

    public async getAll(page: number = 1, pageLimit: number = 10) {
        this.logger.log({
            message: 'Fetching rides paginating',
            page,
            page_limit: pageLimit
        });
        return this.ridesRepository.find({
            skip: (page - 1) * pageLimit,
            take: pageLimit,
        });
    }
}

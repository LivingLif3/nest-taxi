import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/entities/drivers.entity';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './driver.dto';
import { DriverAvailability } from 'src/entities/driver-availability.entity';

@Injectable()
export class DriverService {
    private readonly logger = new Logger(DriverService.name);

    constructor(
        @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,

        @InjectRepository(DriverAvailability) private readonly driverAvailabilityRepository: Repository<DriverAvailability>,
    ) {}

    public create(createDriverDto: CreateDriverDto): Promise<Driver> {
        this.logger.log({
            message: 'Saving driver to database',
            user_id: createDriverDto.user.id,
        });
        const driver = this.driverRepository.create({
            ...createDriverDto,
            rating: 0,
        });
        return this.driverRepository.save(driver);
    }

    public async get(id: string): Promise<Driver> {
        this.logger.log({
            message: 'Fetching driver by ID',
            driver_id: id
        });
        const driver = await this.driverRepository.findOneBy({ id });
        if (!driver) {
            this.logger.error({
                message: 'Driver was not found by ID',
                driver_id: id
            });
            throw new NotFoundException('Driver was not found by ID');
        }
        return driver;
    }
}

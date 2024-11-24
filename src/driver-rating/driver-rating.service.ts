import { Injectable, Logger } from '@nestjs/common';
import { CreateDriverRatingDto } from './driver-rating.dto';
import { DriverRating } from 'src/entities/driver-rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DriverRatingService {
    private readonly logger = new Logger(DriverRatingService.name);

    constructor(@InjectRepository(DriverRating) private readonly driverRatingRepository: Repository<DriverRating>) {}

    public async create(createDriverRatingDto: CreateDriverRatingDto): Promise<DriverRating> {
        this.logger.log({
            message: 'Saving driver ragin to database',
            driver_id: createDriverRatingDto.driver.id
        });
        const createdDriverRating = this.driverRatingRepository.create(createDriverRatingDto);
        const savedDriverRating = await this.driverRatingRepository.save(createdDriverRating);

        this.logger.log({
            message: 'Successfully saved driver rating to database',
            driver_rating_id: savedDriverRating.id
        });
        return savedDriverRating;
    }
}

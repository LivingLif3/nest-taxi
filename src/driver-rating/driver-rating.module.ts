import { Module } from '@nestjs/common';
import { DriverRatingService } from './driver-rating.service';
import { DriverRatingController } from './driver-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverRating } from 'src/entities/driver-rating.entity';

@Module({
  controllers: [DriverRatingController],
  providers: [DriverRatingService],
  imports: [TypeOrmModule.forFeature([DriverRating])]
})
export class DriverRatingModule {}

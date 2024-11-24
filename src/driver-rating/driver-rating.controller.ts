import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { DriverRatingService } from './driver-rating.service';
import { DriverRating } from 'src/entities/driver-rating.entity';
import { CreateDriverRatingDto } from './driver-rating.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('driver-ratings')
export class DriverRatingController {
  private readonly logger = new Logger(DriverRatingController.name);

  constructor(private readonly driverRatingService: DriverRatingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public create(@Body() createDriverRatingDto: CreateDriverRatingDto): Promise<DriverRating> {
    return this.driverRatingService.create(createDriverRatingDto);
  }
}

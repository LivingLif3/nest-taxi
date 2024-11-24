import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rides } from 'src/entities/rides.entity';
import { RideRequestModule } from 'src/ride-request/ride-request.module';

@Module({
  controllers: [RidesController],
  providers: [RidesService],
  imports: [TypeOrmModule.forFeature([Rides]), RideRequestModule]
})
export class RidesModule {}

import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/entities/drivers.entity';
import { DriverAvailability } from 'src/entities/driver-availability.entity';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
  imports: [TypeOrmModule.forFeature([Driver, DriverAvailability])]
})
export class DriverModule {}

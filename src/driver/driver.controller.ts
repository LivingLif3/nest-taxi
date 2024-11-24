import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from 'src/entities/drivers.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public get(@Param('id', ParseUUIDPipe) id: string): Promise<Driver> {
    return this.driverService.get(id);
  }
}
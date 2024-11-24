import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from 'src/entities/car.entity';
import { CreateCarDto } from './car.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public get(@Param('id', ParseUUIDPipe) id: string): Promise<Car> {
    return this.carService.get(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public delete(@Param('id', ParseUUIDPipe) id: string) {
    this.carService.delete(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }
}

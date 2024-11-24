import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRidesDto } from './rides.dto';
import { Rides } from 'src/entities/rides.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public getAll(@Query('page') page: number, @Query('pageLimit') pageLimit: number): Promise<Rides[]> {
    return this.ridesService.getAll(page, pageLimit);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public get(@Param('id', ParseUUIDPipe) id: string): Promise<Rides> {
    return this.get(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public create(@Body() createRidesDto: CreateRidesDto): Promise<Rides> {
    return this.ridesService.create(createRidesDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public completeRide(@Param('id', ParseUUIDPipe) id: string): Promise<Rides> {
    return this.ridesService.completeRide(id);
  }
}

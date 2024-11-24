import {
  Body,
  Controller,
  Headers,
  HttpException,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RideRequestService } from './ride-request.service';
import { CreateRideRequestDto } from './ride-request.dto';
import { Request } from 'express';
import { RideRequest } from 'src/entities/ride-request.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('ride-requests')
export class RideRequestController {
  private readonly logger = new Logger(RideRequestController.name);

  constructor(
    private readonly rideRequestService: RideRequestService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() data: CreateRideRequestDto,
    @Headers('Authorization') authHeader: string,
    @Req() request: Request,
  ): Promise<RideRequest> {
    this.logger.log({
      message: 'Caught request to create ride request',
      request_url: request.originalUrl,
    });
    
    const token = authHeader.split(' ')[1];
    const user = await this.authService.getMe(token);

    return this.rideRequestService.create({
      ...data,
      passanger_id: user.id,
    });
  }
}

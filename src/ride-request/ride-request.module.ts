import { Module } from '@nestjs/common';
import { RideRequestController } from './ride-request.controller';
import { RideRequestService } from './ride-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { RideRequest } from 'src/entities/ride-request.entity';
import { Location } from 'src/entities/location.entity';
import { Driver } from "../entities/drivers.entity";
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RideRequestController],
  providers: [RideRequestService],
  exports: [RideRequestService],
  imports: [TypeOrmModule.forFeature([User, RideRequest, Location, Driver]), UserModule, AuthModule]
})
export class RideRequestModule {}

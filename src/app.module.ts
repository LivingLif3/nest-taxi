import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RideRequestModule } from './ride-request/ride-request.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { RidesModule } from './rides/rides.module';
import { CarModule } from './car/car.module';
import { DriverRatingModule } from './driver-rating/driver-rating.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'course-taxi',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Использовать только на этапе разработки!
    }),
    AuthModule,
    RideRequestModule,
    UserModule,
    DriverModule,
    RidesModule,
    CarModule,
    DriverRatingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

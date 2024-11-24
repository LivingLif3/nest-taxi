import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Driver } from "src/entities/drivers.entity";
import { RideRequest, RideTarrif } from "src/entities/ride-request.entity";

export class CreateRidesDto {
    @IsObject()
    rideRequest: RideRequest;

    @IsObject()
    driver: Driver;
}
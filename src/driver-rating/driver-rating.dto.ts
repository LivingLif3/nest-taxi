import { IsNotEmpty, IsNumber, IsObject, IsString, Max, Min } from "class-validator";
import { Driver } from "src/entities/drivers.entity";
import { Rides } from "src/entities/rides.entity";
import { User } from "src/entities/user.entity";

export class CreateDriverRatingDto {
    @IsObject()
    rides: Rides;
    
    @IsObject()
    driver: Driver;

    @IsObject()
    passanger: User;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}
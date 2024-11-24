import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Car } from "src/entities/car.entity";
import { User } from "src/entities/user.entity";

export class CreateDriverDto {
    @IsObject()
    user: User;

    @IsObject()
    car: Car;

    @IsString()
    @IsNotEmpty()
    license_number: string;
}
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    year: number;

    @IsString()
    @IsNotEmpty()
    licensePlate: string;

    @IsString()
    @IsNotEmpty()
    color: string;
}
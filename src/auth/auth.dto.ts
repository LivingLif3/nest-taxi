import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UserAppRole } from "../entities/user.entity";
import { Car } from 'src/entities/car.entity';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Max(30)
  @Min(6)
  @IsString()
  password: string;

  @IsNotEmpty()
  @Max(30)
  @Min(6)
  @IsString()
  repeatedPassword: string;

  @IsPhoneNumber()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsString()
  role: UserAppRole;

  @IsObject()
  car?: Car;

  @IsString()
  @IsNotEmpty()
  license_number?: string;
}

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Max(30)
  @Min(6)
  @IsString()
  password: string;
}
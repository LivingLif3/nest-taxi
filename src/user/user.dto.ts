import { IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Max, Min } from "class-validator";
import { UserAppRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @Max(30)
    @Min(6)
    @IsString()
    passwordHash: string;

    @IsPhoneNumber()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    grantedAuthority: string;

    @IsNotEmpty()
    @IsString()
    role: UserAppRole;
}
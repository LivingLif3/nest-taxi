import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { getAdminCredentials, isAdmin } from "src/utils/auth.utils";
import { User } from "src/entities/user.entity";
import { DriverService } from "src/driver/driver.service";

export type RegisterResponse = { message: string };
export type AccessTokenResponse = { access_token: string };

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly driverService: DriverService
  ) {}

  public async getMe(token: string): Promise<User> {
    this.logger.log('Extracting user from jwt token');
  
    const decodedToken = this.jwtService.decode(token) as { email: string; sub: string };
    if (!decodedToken || !decodedToken.sub) {
      this.logger.error("Invalid token or token doesn't contain user ID");
      throw new UnauthorizedException("Invalid token");
    }
  
    const user = await this.userService.get(decodedToken.sub);
    if (!user) {
      this.logger.error({
        message: "User not found by id",
        user_id: user.id
      });
      throw new UnauthorizedException("User not found");
    }
  
    this.logger.log({
      message: "User successfully retrieved",
      user_id: user.id,
    });
    
    return user;
  }
  

  public async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    // У водителей должны быть машина при регистрации для базы. Другие иметь не могут
    if ((!registerDto.car && registerDto.role === 'driver') || (registerDto.car && registerDto.role !== 'driver')) {
      this.logger.error('Drivers are supposed to have a car. Not drivers are not supposed to have a car');
      throw new InternalServerErrorException('Drivers are supposed to have a car. Not drivers are not supposed to have a car');
    }

    // Машины должны иметь лицензионный номер (4 цифры, регион, на электричках 1 буква, 3 цифры, регион)
    if (registerDto.car && !registerDto.license_number) {
      this.logger.error('Cars are required to have license number');
      throw new InternalServerErrorException('Cars are required to have license number');
    }

    const { email, password, repeatedPassword } = registerDto;

    // Пароли должны быть равны
    if (password !== repeatedPassword) {
      this.logger.error("Couldn't verify password");
      throw new InternalServerErrorException("Couldn't verify password. Repeat password correct");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Прооверяем admin credentials и устанавливаем основную роль доступа
    const baseRole = isAdmin({ email, password }) ? "admin" : "user";

    const savedUser = await this.userService.create({
      ...registerDto,
      firstname: registerDto.firstname,
      grantedAuthority: baseRole,
      role: registerDto.role,
      passwordHash,
    });

    if (registerDto.role === 'driver') {
      const driver = await this.driverService.create({
        user: savedUser,
        car: registerDto.car,
        license_number: registerDto.license_number,
      });
    }

    this.logger.log({
      message: "User was successfully registered",
      user_id: savedUser.id,
    });
    return { message: "User registered successfully" };
  }

  public async login({ email, password }: LoginDto): Promise<AccessTokenResponse> {
    const user = await this.userService.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      this.logger.log({
        message: "User successfully logged in",
        access_token: accessToken,
      });
      return { access_token: accessToken };
    }

    this.logger.error({
      message: "Couldn`t verify user credentials",
      user_email: email,
    });
    throw new UnauthorizedException("Invalid credentials");
  }
}

import { Controller, Post, Body, Logger, Req, Get, Headers, UseGuards } from '@nestjs/common';
import {
  AccessTokenResponse,
  AuthService,
  RegisterResponse,
} from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  public getMe(
    @Headers('Authorization') authHeader: string,
    @Req() request: Request
  ): Promise<User> {
    this.logger.log({
      message: 'Caught request to get me',
      request_url: request.originalUrl,
    });

    const token = authHeader.split(' ')[1];
    return this.authService.getMe(token); 
  }

  @Post('register')
  public register(
    @Body() registerDto: RegisterDto,
    @Req() request: Request,
  ): Promise<RegisterResponse> {
    this.logger.log({
      message: 'Caught request to register user',
      request_url: request.originalUrl,
    });
    return this.authService.register(registerDto);
  }

  @Post('login')
  public login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
  ): Promise<AccessTokenResponse> {
    this.logger.log({
      message: 'Caught request to login user',
      request_url: request.originalUrl,
    });
    return this.authService.login(loginDto);
  }
}

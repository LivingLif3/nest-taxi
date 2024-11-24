import { Controller, Get, Headers, Logger, Req } from '@nestjs/common';
import { getEnv } from './utils/env.utils';
import { ENV__APP_DESCRIPTION, ENV__APP_NAME, ENV__APP_VERSION } from './common/database/entity/env.constants';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';

export interface IServiceInfo {
  version: string;
  name: string;
  description: string;
}

export interface IUserRequestInfo {
  authenticated: boolean;
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly authService: AuthService) { }

  @Get()
  public getAppInfo(
    @Headers('authorization') authHeader: string,
    @Req() request: Request
  ): IServiceInfo & IUserRequestInfo {
    const token = authHeader.split(' ')[1];
    const userAuthenticated = !!this.authService.getMe(token); 

    this.logger.log({
      message: 'Caught request to get app info',
      request_url: request.originalUrl,
      authenticated: userAuthenticated,
    });

    return {
      version: getEnv<string>(ENV__APP_VERSION),
      name: getEnv<string>(ENV__APP_NAME),
      description: getEnv<string>(ENV__APP_DESCRIPTION),
      authenticated: userAuthenticated,
    };
  }
}
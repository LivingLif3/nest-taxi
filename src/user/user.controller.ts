import { Controller, Get, Logger, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public get(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.get(id)
  }

  @Get(':enail')
  @UseGuards(JwtAuthGuard)
  public getByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getByEmail(email);
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/auth.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public create(registerUserDto: CreateUserDto): Promise<User> {
    this.logger.log({
      message: 'Saving user in database',
      user_email: registerUserDto.email,
    });
    const createdUser = this.userRepository.create(registerUserDto);
    return this.userRepository.save(createdUser);
  }

  public async get(id: string): Promise<User> {
    this.logger.log({
      message: 'Fetching user by id',
      user_id: id,
    });
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      this.logger.error({
        message: 'User was not found by id',
        user_id: id,
      });
      throw new NotFoundException('User was not found by id');
    }

    this.logger.log({
      message: 'User was successfully found by id',
      user_id: id,
    });
    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    this.logger.log({
      message: 'Fetching user by email',
      user_email: email,
    });
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      this.logger.error({
        message: 'User was not found by email',
        user_email: email,
      });
      throw new NotFoundException('User was not found by email');
    }

    this.logger.log({
      message: 'User was successfully found by email',
      user_email: email,
    });
    return user;
  }
}

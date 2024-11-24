import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Car } from './car.entity';
import { Rides } from './rides.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class Driver extends BaseEntity {
  @OneToOne(() => User, (user) => user.driver)
  @JoinColumn()
  user: User;

  @OneToMany(() => Car, (car) => car.driver)
  @JoinColumn()
  car: Car;

  @OneToOne(() => Rides, (rides) => rides.driver)
  rides: Rides;

  @Column({
    type: String,
  })
  license_number: string;

  @Column({
    type: Number,
  })
  rating: number;
}

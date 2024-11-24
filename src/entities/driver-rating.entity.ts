import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Driver } from './drivers.entity';
import { Rides } from './rides.entity';
import { User } from './user.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class DriverRating extends BaseEntity {
  @OneToOne(() => Rides)
  @JoinColumn()
  rides: Rides;

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @OneToOne(() => User)
  @JoinColumn()
  passanger: User;

  @Column({
    type: Number,
  })
  rating: number;

  @Column({
    type: String,
  })
  comment: string;
}

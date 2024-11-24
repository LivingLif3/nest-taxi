import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './drivers.entity';
import { User } from './user.entity';
import { Location } from './location.entity';

@Entity()
export class Rides {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Driver, (driver) => driver.rides)
  @JoinColumn()
  driver: Driver;

  @OneToOne(() => User, (user) => user.rides)
  @JoinColumn()
  passanger: User;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'start_location_id' })
  startLocation: Location;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'end_location_id' })
  endLocation: Location;

  @Column({
    type: Number,
  })
  cost: number;

  @Column()
  status: "going" | "completed";
}

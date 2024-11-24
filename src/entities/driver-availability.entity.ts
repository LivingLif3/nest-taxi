import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './drivers.entity';
import { Location } from './location.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class DriverAvailability extends BaseEntity{

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @Column({
    type: Date,
    name: 'available_from',
  })
  availableFrom: Date;

  @Column({
    type: Date,
    name: 'available_until',
  })
  availableUntil: Date;

  @OneToOne(() => Location)
  @JoinColumn({
    name: 'pickup_location',
  })
  pickupLocation: Location;
}

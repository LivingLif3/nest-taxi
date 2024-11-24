import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import { User } from './user.entity';
import { Location } from './location.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

export type RideTarrif = "econom" | "comfort" | "comfort+" | "business"; 

@Entity()
export class RideRequest extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  passanger: User;

  @OneToOne(() => Location)
  @JoinColumn({
    name: 'pickup_location',
  })
  pickupLocation: Location;

  @OneToOne(() => Location)
  @JoinColumn({
    name: 'dropoff_location',
  })
  dropoffLocation: Location;

  @DeleteDateColumn({
    name: "deleted_at"
  })
  deletedAt: Date;

  @Column({
    type: Date,
    name: 'requested_time',
  })
  requestedTime: Date;

  @Column({
    type: String,
  })
  status: string;

  @Column()
  tarrif: RideTarrif;

  @Column()
  cost: number;
}

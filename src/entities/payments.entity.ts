import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Rides } from './rides.entity';
import { PaymentMethod } from './payment.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class Payments extends BaseEntity {
  @OneToOne(() => Rides)
  @JoinColumn()
  ride: Rides;

  @OneToOne(() => Rides)
  @JoinColumn({
    name: 'payment_method',
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: Number,
  })
  amount: number;

  @Column({
    type: Date,
    name: 'payment_time'
  })
  paymentTime: Date;

  @Column({
    type: String,
  })
  status: string;
}

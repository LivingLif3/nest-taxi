import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Driver } from './drivers.entity';
import { Rides } from './rides.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

export type UserAppRole = "driver" | "passanger";

@Entity()
export class User extends BaseEntity {

  @Column({
    type: String,
    name: 'firstname',
  })
  firstname: string;

  @Column({
    type: String,
    name: 'lastname'
  })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: String,
  })
  phone: string;

  @Column({
    type: String,
    name: 'password_hash'
  })
  passwordHash: string;

  @Column({
    name: 'granted_authority'
  })
  grantedAuthority: string;

  @Column()
  role: UserAppRole;

  @OneToOne(() => Driver, (driver) => driver.user)
  driver: Driver;

  @OneToOne(() => Rides, (rides) => rides.passanger)
  rides: Rides;
}

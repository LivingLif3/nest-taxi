import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Driver } from './drivers.entity';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class Car extends BaseEntity {
  @ManyToOne(() => Driver, (driver) => driver.car)
  driver: Driver;

  @Column({
    type: String,
  })
  make: string;

  @Column({
    type: String,
  })
  model: string;

  @Column({
    type: Number,
  })
  year: number;

  @Column({
    type: String,
    name: 'license_plate',
  })
  licensePlate: string;

  @Column({
    type: String,
  })
  color: string;
}

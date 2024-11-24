import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class Location extends BaseEntity {
  @Column({
    type: String,
  })
  address: string;

  @Column({
    type: String,
  })
  city: string;

  @Column({
    type: Number,
  })
  latitude: Number;

  @Column({
    type: Number,
  })
  longitude: Number;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from "../common/database/entity/base-entity";

@Entity()
export class PaymentMethod extends BaseEntity {
  @Column({
    type: String,
  })
  name: string;
}

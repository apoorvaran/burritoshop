import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  totalPrice!: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems!: OrderItem[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Burrito } from './Burrito';
import { Order } from './Order';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Burrito, (burrito) => burrito.orderItems)
  burrito!: Burrito;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order!: Order;
}
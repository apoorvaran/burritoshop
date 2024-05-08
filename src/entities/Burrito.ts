import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class Burrito {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  size!: string;

  @Column()
  price!: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.burrito)
  orderItems!: OrderItem[];
}

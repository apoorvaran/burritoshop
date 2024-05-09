import { EntityManager, In } from 'typeorm';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';


export class OrderService {
  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.entityManager.find(Order);
  }

async createOrder(orderItems: number[], totalPrice: number): Promise<Order> {
    const order = new Order();
    order.totalPrice = totalPrice;
   
    order.orderItems = await this.entityManager.find(OrderItem, { where: {id: In(orderItems)}} );
    return await this.entityManager.save(Order, order);
  }
  async getOrderItembyOrderId(orderId: number): Promise<OrderItem[]> {
    const order = await this.entityManager.findOneByOrFail(Order, { id: orderId });
    console.log(order);
    console.log(order.orderItems);
    return order.orderItems;
  }
}


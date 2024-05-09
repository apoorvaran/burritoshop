import { EntityManager } from 'typeorm';
import { OrderItem } from '../entities/OrderItem';
import { Burrito } from '../entities/Burrito';
import { Order } from '../entities/Order';

export class OrderItemService {
  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  async getOrderItembyOrderId(orderId: number): Promise<OrderItem[]> {
    return await this.entityManager.find(OrderItem, {
        where: { order: { id: orderId } },
        relations: ['order']
      });
  }

async createOrderItem(burritoId: number, quantity: number): Promise<OrderItem> {
    const orderItem = new OrderItem();
    orderItem.quantity = quantity;
    orderItem.burrito = await this.entityManager.findOneByOrFail(Burrito, { id: burritoId, });

    return await this.entityManager.save(OrderItem, orderItem);
  }
}


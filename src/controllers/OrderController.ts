import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { OrderService } from '../services/OrderService';
import { Order } from '../entities/Order';
import { OrderItemService } from '../services/OrderItemService';
import { BurritoService } from '../services/BurritoService';
import { OrderItem } from '../entities/OrderItem';

export class OrderController {
  private orderService: OrderService;
  private orderItemService: OrderItemService;
  private burritoService: BurritoService;

  constructor(private readonly entityManager: EntityManager) {
    this.orderService = new OrderService(entityManager);
    this.orderItemService = new OrderItemService(entityManager);
    this.burritoService = new BurritoService(entityManager);
  }

  async getAllOrders(req: Request, res: Response) {
    const orders: Order[] = await this.orderService.getAllOrders();
    res.json(orders);
  }

  async createOrder(req: Request, res: Response) {
    /*
    [{burritoid1,10}, {burritoid2,5]},....
     */
    const orderItems:OrderItemRequest[] = req.body;
    var totalPrice = 0;
    var orderItemList: OrderItem[] = []
    orderItems.forEach(async (element) => orderItemList.push(await this.orderItemService.createOrderItem(element.burritoId, element.quantity)));
    orderItemList.forEach(async (element) => {totalPrice += (await element).burrito.price*(await element).quantity});
    const newOrder: Order = await this.orderService.createOrder(orderItemList.map((item) => item.id), totalPrice);
    res.json(newOrder);
  }

  async getOrderDetails(req: Request, res: Response) {

    const orderId = req.body;
    const orderItemList = await this.orderItemService.getOrderItembyOrderId(orderId);
    res.json(orderItemList);
  }
}

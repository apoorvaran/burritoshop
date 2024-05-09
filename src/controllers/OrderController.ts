import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { OrderService } from '../services/OrderService';
import { Order } from '../entities/Order';
import { OrderItemService } from '../services/OrderItemService';
import { BurritoService } from '../services/BurritoService';
import { OrderItem } from '../entities/OrderItem';
import { OrderItemRequest } from '../Interfaces';
import { url } from 'inspector';

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
    console.log(req.body);
    const orderItems: OrderItemRequest[] = req.body;
    console.log(orderItems);
    var totalPrice = 0;
    var orderItemList: OrderItem[] = [];
    orderItems.forEach((element) => {
      this.orderItemService
        .createOrderItem(element.burritoId, element.quantity)
        .then((item) => {
          orderItemList.push(item);
          orderItemList.forEach((element) => {
            totalPrice += element.burrito.price * element.quantity;
          });
          this.orderService
            .createOrder(
              orderItemList.map((item) => item.id),
              totalPrice
            )
            .then((newOrder) => {
              res.json(newOrder);
            });
        });
    });
  }

  async getOrderDetails(req: Request, res: Response) {
    /*
    const orderId = req.param("orderId");
    console.log(orderId);
    const orderItemList = await this.orderService.getOrderItembyOrderId(Number(orderId));
    console.log(orderItemList);
    res.json(orderItemList);*/
    const orderId = Number(req.params.orderId);
    const orderItemList = await this.orderItemService.getOrderItembyOrderId(
      orderId
    );
    res.json(orderItemList);
  }
}

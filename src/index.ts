import 'reflect-metadata';
import express from 'express';
import { createConnection, EntityManager } from 'typeorm';
import { BurritoController } from './controllers/BurritoController';
import { OrderController } from './controllers/OrderController';

const app = express();
const PORT = 3000;

createConnection({
  type: 'sqlite',
database: 'burritodb.sql',
  entities: [
    'src/entities/*.ts'
  ],
  synchronize: true,
  logging: true
}).then(connection => {
    console.log('Database connected');
    const entityManager: EntityManager = connection.manager;

    // Inject EntityManager into controllers
    const burritoController = new BurritoController(entityManager);
    const orderController = new OrderController(entityManager);
    burritoController.createBurrito();
    // Define routes
    app.use(express.json());
    app.get('/burritos', burritoController.getAllBurritos.bind(burritoController));
    app.post('/orders', orderController.createOrder.bind(orderController));
    app.get('/orders', orderController.getAllOrders.bind(orderController));
    app.get('/orders/:orderId', orderController.getOrderDetails.bind(orderController));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

import express from 'express';

import { OrderController } from './controllers/OrderController';
import { OrderService } from './services/OrderService';
import { NotificationService } from './services/NotificationService';

import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { PrismaProductRepository } from './repositories/PrismaProductRepository';

import { EtherealMailProvider } from './providers/EtherealMailProvider';
import { CreditCardPayment } from './payments/CreditCardPayment';

const app = express();
app.use(express.json());

// Repositories (Prisma)
const orderRepository = new PrismaOrderRepository();
const productRepository = new PrismaProductRepository();

// Providers / Services
const mailProvider = new EtherealMailProvider();
const notificationService = new NotificationService(mailProvider);

// Payment strategy
const paymentMethod = new CreditCardPayment();

// Use case
const orderService = new OrderService(
  orderRepository,
  productRepository,
  notificationService,
  paymentMethod
);

// Controller
const orderController = new OrderController(orderService);

// Routes
app.post('/orders', (req, res) =>
  orderController.create(req, res)
);

export { app };
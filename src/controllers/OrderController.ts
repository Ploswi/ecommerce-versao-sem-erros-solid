import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const order = await this.orderService.execute(req.body);
      return res.status(201).json({message: 'Pedido processado com sucesso', orderID: order.orderId, previewUrl: order.previewUrl});
    } catch (error: any)
    {
      console.log(error);
      return res.status(400).json({
        message: error.message
      });
    }
  }
}
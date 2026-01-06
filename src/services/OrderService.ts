import { ProductFactory } from '../domain/ProductFactory';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { NotificationService } from './NotificationService';
import { PaymentFactory } from '../payments/PaymentFactory';

interface OrderItemInput {
  productId: number;
  quantity: number;
}

interface OrderInput {
  customer: string;
  items: OrderItemInput[];
  paymentMethod: string;
  paymentDetails: any;
}

interface OrderItemSnapshot {
  productId: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  freight: number;
  unitTotal: number;
}

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private notificationService: NotificationService
  ) {}

  async execute(input: OrderInput): Promise<any> {
    let total = 0;
    const itemsDetails: OrderItemSnapshot[] = [];

    for (const item of input.items) {
      const productData = await this.productRepository.findById(item.productId);

      if (!productData) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      const product = ProductFactory.createProduct(productData);

      const freight = product.calculateFreight();
      const unitTotal = product.price + freight;

      total += unitTotal * item.quantity;

      itemsDetails.push({
        productId: productData.id,
        name: productData.name,
        type: productData.type,
        price: product.price,
        quantity: item.quantity,
        freight,
        unitTotal
      });
    }
    
    if (input.paymentMethod === 'creditcard' || input.paymentMethod === 'card') {
      if (
        !input.paymentDetails ||
        !input.paymentDetails.cardNumber ||
        !input.paymentDetails.cvv
      ) {
        throw new Error('Dados do cartão são obrigatórios para pagamento com cartão');
      }
    }

    const paymentMethod = PaymentFactory.create(
      input.paymentMethod,
      input.paymentDetails
    );

    await paymentMethod.process(total);

    const order = await this.orderRepository.save({
      customer: input.customer,
      items: JSON.stringify(itemsDetails),
      total,
      status: 'confirmed',
    });


    const previewUrl = await this.notificationService.notifyOrderCreated(
      input.customer,
      order.id,
      order.total,
      order.items
    );

    return {
      message: 'Pedido processado com sucesso',
      orderId: order.id,
      previewUrl
    };
  }
}
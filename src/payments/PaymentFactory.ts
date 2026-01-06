import { IPaymentMethod } from './IPaymentMethod';
import { CreditCardPayment } from './CreditCardPayment';
import { PixPayment } from './PixPayment';

export class PaymentFactory {
  static create(
    method: string,
    details: any
  ): IPaymentMethod {
    switch (method.toLowerCase()) {
      case 'creditcard':
      case 'card':
        return new CreditCardPayment(details);

      case 'pix':
        return new PixPayment();

      default:
        throw new Error(`Método de pagamento inválido: ${method}`);
    }
  }
}
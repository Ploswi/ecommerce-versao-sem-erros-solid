import { IPaymentMethod } from './IPaymentMethod';

export class CreditCardPayment implements IPaymentMethod {
  async process(amount: number): Promise<void> {
    const approved = true; // simulação

    if (!approved) {
      throw new Error('Pagamento recusado');
    }
  }
}

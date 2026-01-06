import { IPaymentMethod } from './IPaymentMethod';

export class PixPayment implements IPaymentMethod {
  async process(amount: number): Promise<void> {

    if (amount <= 0) {
      throw new Error('Valor inválido para pagamento via PIX');
    }

    console.log(`Pagamento via PIX processado com sucesso.`);
    console.log(`Valor: R$ ${amount.toFixed(2)}`);

    return;
  }
}
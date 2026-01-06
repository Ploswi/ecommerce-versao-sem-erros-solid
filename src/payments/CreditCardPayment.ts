import { IPaymentMethod } from './IPaymentMethod';

interface CreditCardDetails {
  cardNumber: string;
  cvv: string;
}

export class CreditCardPayment implements IPaymentMethod {
  constructor(private details: CreditCardDetails) {}

  async process(amount: number): Promise<void> {
    if (!this.details.cardNumber || !this.details.cvv) {
      throw new Error('Dados do cartão inválidos');
    }

    console.log('Pagamento via Cartão de Crédito');
    console.log(`Valor: R$ ${amount.toFixed(2)}`);
    console.log(`Cartão: **** **** **** ${this.details.cardNumber.slice(-4)}`);
  }
}
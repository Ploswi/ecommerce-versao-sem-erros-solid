export interface IPaymentMethod {
  process(amount:number): Promise<void>;
}
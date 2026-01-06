export interface IOrderRepository {
  save(data:any): Promise<any>;
}

import { prisma } from '../lib/prisma';
import { IOrderRepository } from './IOrderRepository';

export class PrismaOrderRepository implements IOrderRepository {
  async save(data: any): Promise<any> {
    try {
      // O Prisma pode travar se o objeto de dados estiver incompleto ou mal formatado
      return await prisma.order.create({
        data: {
          customer: data.customerEmail || data.customer, // Garante que a string do cliente exista
          items: typeof data.items === 'string' ? data.items : JSON.stringify(data.items || {}),
          total: Number(data.total),
          status: data.status || "confirmed"
        }
      });
    } catch (error) {
      console.error("Erro detalhado no Repositório:", error);
      throw error;
    }
  }
}
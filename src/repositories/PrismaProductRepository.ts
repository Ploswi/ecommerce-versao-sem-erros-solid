import { PrismaClient } from '@prisma/client';
import { IProductRepository } from './IProductRepository';

export class PrismaProductRepository implements IProductRepository {
  private prisma = new PrismaClient();

  async findById(id: number) {
    return this.prisma.product.findUnique({
      where: { id }
    });
  }
}
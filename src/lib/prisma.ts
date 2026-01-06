import { PrismaClient } from '@prisma/client';

// Instância única partilhada por toda a aplicação
export const prisma = new PrismaClient();
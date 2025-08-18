import { PrismaClient } from 'generated/prisma';

export const extendedPrismaClient = new PrismaClient();

export type ExtendedPrismaClient = typeof extendedPrismaClient;

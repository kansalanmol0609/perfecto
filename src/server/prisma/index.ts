//libs
import {PrismaClient} from '@prisma/client';

declare const global: typeof globalThis & {prisma?: PrismaClient};

// Prevent multiple instances of Prisma Client in development
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export {prisma};

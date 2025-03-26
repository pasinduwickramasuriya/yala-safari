// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//     datasources: {
//       db: {
//         url: process.env.DATABASE_URL
//       }
//     }
//   })
// }

// export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export default prisma


import { PrismaClient } from '@prisma/client';

// Declare a global type for the Prisma client to avoid multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Function to create a new PrismaClient instance
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Ensure DATABASE_URL is set in your environment
      },
    },
  });
};

// Use the existing global Prisma client if available, otherwise create a new one
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// In development, store the Prisma client in the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
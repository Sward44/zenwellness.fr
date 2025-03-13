// import { PrismaClient } from "@prisma/client";
// const globalForPrisma = { prisma };
// export const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };

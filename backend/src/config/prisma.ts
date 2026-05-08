import { PrismaClient, Prisma } from "@prisma/client";

const softDeleteModels = ["User", "Post"];

const softDeleteExtension = Prisma.defineExtension({
  query: {
    $allModels: {
      async findFirst({ model, args, query }) {
        if (softDeleteModels.includes(model)) {
          args.where = { ...args.where, deletedAt: null };
        }
        return query(args);
      },
      async findMany({ model, args, query }) {
        if (softDeleteModels.includes(model)) {
          args.where = { ...args.where, deletedAt: null };
        }
        return query(args);
      },
      async findUnique({ model, args, query }) {
        if (softDeleteModels.includes(model)) {
          args.where = { ...args.where, deletedAt: null } as typeof args.where;
        }
        return query(args);
      },
    },
  },
});

const basePrisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as { prisma: typeof prisma };

export const prisma = basePrisma.$extends(softDeleteExtension);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

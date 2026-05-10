import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import type { ListUsersQuery } from "@repo/shared";
import type { UserSyncData } from "../types";

class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findMany(query: ListUsersQuery) {
    const { page, limit, search, sortBy, sortOrder, role, includeDeleted } = query;
    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { username: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(!includeDeleted && { deletedAt: null }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async upsert(data: UserSyncData) {
    return prisma.user.upsert({
      where: { id: data.id },
      create: data,
      update: { ...data, deletedAt: null },
    });
  }

  async update(id: string, data: Partial<UserSyncData>) {
    return prisma.user.update({
      where: { id },
      data: data as Prisma.UserUpdateInput,
    });
  }

  async softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const userRepository = new UserRepository();

import { z } from "zod";
import { paginationSchema, searchSchema } from "./common";

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30).optional(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdParamSchema = z.object({
  id: z.string().min(1),
});

const userFilterSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).optional(),
  includeDeleted: z.coerce.boolean().default(false),
});

export const listUsersQuerySchema = paginationSchema
  .merge(searchSchema)
  .merge(userFilterSchema);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;

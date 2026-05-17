import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const ALLOWED_SORT_FIELDS = ["createdAt", "updatedAt", "email", "username"] as const;

export const searchSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(ALLOWED_SORT_FIELDS).optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const timestampSchema = z.object({
  createdAfter: z.coerce.date().optional(),
  createdBefore: z.coerce.date().optional(),
});

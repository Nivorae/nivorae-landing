/**
 * Common Validation Schemas
 *
 * Reusable Zod schemas for form validation.
 *
 * @see docs/SECURITY.md#input-validation (OWASP A03)
 */

import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z.string().email("Please enter a valid email address");

/**
 * Username validation schema
 * - 3-50 characters
 * - Alphanumeric, underscores, and hyphens only
 */
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(50, "Username must be at most 50 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens"
  );

/**
 * Non-empty string with max length
 */
export const requiredStringSchema = (maxLength = 255) =>
  z
    .string()
    .min(1, "This field is required")
    .max(maxLength, `Maximum ${maxLength} characters allowed`);

/**
 * Optional string with max length
 */
export const optionalStringSchema = (maxLength = 255) =>
  z.string().max(maxLength, `Maximum ${maxLength} characters allowed`).optional();

/**
 * Positive integer schema
 */
export const positiveIntSchema = z
  .number()
  .int("Must be a whole number")
  .positive("Must be a positive number");

/**
 * Pagination parameters schema
 */
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

/**
 * Date range schema
 */
export const dateRangeSchema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be before or equal to end date",
    path: ["startDate"],
  });

/**
 * UUID schema
 */
export const uuidSchema = z.string().uuid("Invalid ID format");

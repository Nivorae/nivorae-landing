import type { ApiResponse } from "@repo/shared";

export function success<T>(data: T, meta?: ApiResponse<T>["meta"]): ApiResponse<T> {
  return { success: true, data, ...(meta && { meta }) };
}

export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: { total?: number; page?: number; limit?: number };
}

export interface ApiError {
  success: false;
  error: { code: string; message: string; details?: Record<string, string[]> };
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

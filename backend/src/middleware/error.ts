import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../constants/errors";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(
    {
      path: req.path,
      method: req.method,
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
    "Request error"
  );

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        details: err.flatten().fieldErrors,
      },
    });
    return;
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        res.status(409).json({
          success: false,
          error: {
            code: "CONFLICT",
            message: "Resource already exists",
            field: (err.meta?.target as string[])?.[0],
          },
        });
        return;
      case "P2025":
        res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Resource not found" },
        });
        return;
      default:
        logger.error({ code: err.code, meta: err.meta }, "Unhandled Prisma error");
    }
  }

  // Known application errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    });
    return;
  }

  // Unknown errors — never expose internals
  res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" },
  });
};

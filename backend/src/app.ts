import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { pinoHttp } from "pino-http";
import { errorHandler } from "./middleware/error";
import { routes } from "./routes";
import { logger } from "./utils/logger";
import { prisma } from "./config/prisma";
import { success } from "./utils/response";
import { env } from "./config/env";

export function createApp() {
  const app = express();

  // Security headers (XSS, HSTS, clickjacking, MIME sniffing)
  app.use(
    helmet({
      contentSecurityPolicy: true,
      hsts: { maxAge: 31536000, includeSubDomains: true },
      frameguard: { action: "deny" },
      noSniff: true,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    }),
  );

  // CORS locked to client origin
  app.use(cors({ origin: env.CLIENT_URL }));

  // Body size cap
  app.use(express.json({ limit: "10kb" }));

  // Global rate limit: 100 requests per IP per hour
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        error: { code: "RATE_LIMITED", message: "Too many requests" },
      },
    }),
  );

  // Structured logging
  app.use(pinoHttp({ logger }));

  // Health check
  app.get("/health", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json(
        success({
          status: "healthy",
          db: "connected",
          timestamp: new Date().toISOString(),
        }),
      );
    } catch {
      res.status(503).json({
        success: false,
        error: { code: "UNHEALTHY", message: "Database connection failed" },
      });
    }
  });

  // API routes
  app.use("/api", routes);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}

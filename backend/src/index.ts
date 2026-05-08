import { createApp } from "./app";
import { logger } from "./utils/logger";
import { prisma } from "./config/prisma";
import { env } from "./config/env";

process.on("unhandledRejection", (err) => {
  logger.error({ error: err }, "Unhandled rejection");
});

process.on("uncaughtException", (err) => {
  logger.fatal({ error: err }, "Uncaught exception");
  process.exit(1);
});

async function shutdown() {
  logger.info("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

const app = createApp();
app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});

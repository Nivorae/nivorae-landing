/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, Plugin } from "vite";
import path from "path";
import pkg from "../package.json";

/**
 * Build the Content-Security-Policy directive string.
 *
 * Dev mode adds 'unsafe-inline' to script-src (Vite HMR injects inline
 * scripts) and ws:/wss: to connect-src (HMR WebSocket).
 *
 * @security OWASP A05:2021 - Security Misconfiguration
 */
function buildCSP(isDev: boolean): string {
  const scriptSrc = isDev ? "'self' 'unsafe-inline'" : "'self'";
  const connectSrc = isDev ? "'self' ws: wss: https:" : "'self' https:";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "media-src 'self' http://8.209.221.1:32721",
    `connect-src ${connectSrc}`,
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

/**
 * Vite plugin to add security headers during development.
 */
function securityHeadersPlugin(isDev: boolean): Plugin {
  const securityHeaders: Record<string, string> = {
    "Content-Security-Policy": buildCSP(isDev),
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  };

  return {
    name: "security-headers",
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        Object.entries(securityHeaders).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        next();
      });
    },
  };
}

/**
 * Resolves and validates a path to prevent path traversal attacks.
 *
 * @security CWE-22: Path Traversal
 * @see docs/SECURITY.md#path-traversal-prevention
 */
function resolveAndValidatePath(basePath: string, relativePath: string): string {
  const resolvedPath = path.normalize(path.resolve(basePath, relativePath));
  if (!resolvedPath.startsWith(basePath)) {
    throw new Error(
      `Path traversal detected: ${relativePath} resolves to ${resolvedPath} which is outside ${basePath}`
    );
  }
  return resolvedPath;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), "");

  // System env takes precedence over .env file
  const env = {
    ...fileEnv,
    ...process.env,
  };

  console.log(`[Vite] Mode: ${mode}`);
  console.log(
    `[Vite] API URL: ${env.VITE_API_URL || "using default"} ${process.env.VITE_API_URL ? "(from system env)" : "(from .env file)"}`
  );

  return {
    plugins: [react(), securityHeadersPlugin(mode === "development")],
    define: {
      // Injects version from package.json into app at build time
      // Usage in components: const version = __APP_VERSION__; // "v1.0.0"
      __APP_VERSION__: JSON.stringify(`v${pkg.version}`),
    },
    resolve: {
      alias: {
        "@": resolveAndValidatePath(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      port: 5179,
      host: true,
      strictPort: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3002",
          changeOrigin: true,
        },
        "/webhooks": {
          target: env.VITE_API_URL || "http://localhost:3002",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "build",
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            // No large libraries detected - Vite handles chunking automatically
          },
        },
      },
    },
  };
});

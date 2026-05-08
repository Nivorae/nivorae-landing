# syntax=docker/dockerfile:1.6
#
# Production image for the backend of a pnpm-workspace monorepo.
# Build context: REPO ROOT (.). Never set build context to backend/.
# Zeabur / Railway / Fly:
#   - Root Directory  = .
#   - Dockerfile Path = Dockerfile (at repo root)

# ─── Base: pnpm-enabled Node image ───────────────────────────────────────────
FROM node:20-alpine AS base
# tzdata — for cron timezone
# openssl — Prisma query engine needs it on Alpine
# dumb-init — forwards SIGTERM so node shuts down gracefully
RUN apk add --no-cache tzdata openssl dumb-init \
 && corepack enable && corepack prepare pnpm@10.28.2 --activate
ENV TZ=UTC
# Disable husky — root `prepare: husky install` fails under `--prod`
# because husky is a devDep and gets stripped.
ENV HUSKY=0
WORKDIR /app

# ─── Deps: install workspace deps, cached separately from source ─────────────
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/
# CRITICAL: frontend/package.json must be copied too, even though we don't build
# the frontend here. `pnpm-workspace.yaml` lists it, and `--frozen-lockfile`
# validates every workspace member's manifest regardless of filter.
COPY frontend/package.json ./frontend/
RUN pnpm install --frozen-lockfile --filter "@repo/shared..." --filter "@repo/backend..."

# ─── Build: compile shared, then backend, generate Prisma client ─────────────
FROM deps AS build
COPY shared ./shared
COPY backend ./backend
RUN pnpm --filter @repo/shared build \
 && pnpm --filter @repo/backend exec prisma generate \
 && pnpm --filter @repo/backend build

# ─── Deploy: produce a flat, self-contained backend output ───────────────────
# `pnpm deploy` with --legacy flag is required in pnpm 10 when `.npmrc` doesn't
# have `inject-workspace-packages=true`. Without --legacy, deploy exits 1.
FROM build AS deploy
RUN pnpm --filter @repo/backend --prod --legacy deploy /deployed \
 && cp -r backend/prisma /deployed/prisma \
 && cd /deployed && node_modules/.bin/prisma generate

# ─── Runtime: minimal image with deployed backend ────────────────────────────
FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Non-root user for least-privilege runtime.
RUN addgroup -S app && adduser -S app -G app
COPY --from=deploy --chown=app:app /deployed ./
USER app

EXPOSE 3001

# dumb-init handles SIGTERM → forwards to node → Express closes gracefully.
# `exec node` replaces the sh process so node becomes PID 1 child of dumb-init
# (not sh), ensuring proper signal forwarding.
ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && exec node dist/index.js"]

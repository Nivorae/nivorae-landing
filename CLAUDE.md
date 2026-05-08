# CLAUDE.md - AI Assistant Instructions

## Project Overview

React + Vite + TypeScript template, Express + Prisma backend. Security-first, OWASP Top 10 (2021).

## Git Branching

`feature/*` → `develop` → `main`. PRs MUST target `develop` (enforced by `pr-branch-guard.sh` PreToolUse hook).

## Versioning & Release

Source of truth: root `package.json` `version`. `CHANGELOG.md` and git tag `v<version>` MUST stay in sync.

1. `/git:changelog` — bumps version + updates CHANGELOG
2. `chore: release v<version>`
3. `git tag v<version> && git push --tags`

Helpers: `/git:branch` (suggest branch name), `/git:commit` (Conventional Commits).

## Tech Stack

React 18, TypeScript, Vite, Tailwind, shadcn/ui, Radix, Zod, React Hook Form, Axios. Backend: Express, Prisma, Clerk.

## Critical Security Patterns

### URL Whitelist (OWASP A10) — every API call

```typescript
import { isPathAllowed, USERS_WHITELIST } from "@/core/security/urlWhitelist";

if (!isPathAllowed(path, USERS_WHITELIST))
  throw new Error(`Path not in whitelist: ${path}`);
await apiClient.get(path);
```

### Timing-Safe Compare (OWASP A07) — password confirmation

```typescript
import { constantTimeCompare } from "@/core/security/constantTimeCompare";
if (!constantTimeCompare(password, confirmPassword))
  setError("Passwords do not match");
```

### Error Sanitization (OWASP A05) — never expose raw errors

```typescript
import { formatApiError } from "@/core/api/errors";
catch (error) { toast.error(formatApiError(error, "save user")); }
```

### Protected Routes (OWASP A01)

```typescript
<ProtectedRoute requiredPermission="admin:access"><AdminPanel /></ProtectedRoute>
```

## Architecture

Feature-based: `src/features/[domain]/{components,hooks,services,types,index.ts}`.

New feature checklist:

1. Add path prefix to `src/core/security/urlWhitelist.ts`
2. Service uses `apiClient` + whitelist check
3. Hooks use `classifyError` for catch blocks
4. Barrel export in `index.ts`

## Quick Reference

| Pattern             | File                                       |
| ------------------- | ------------------------------------------ |
| URL Whitelist       | `src/core/security/urlWhitelist.ts`        |
| Timing-Safe Compare | `src/core/security/constantTimeCompare.ts` |
| Error Classifier    | `src/core/errors/errorClassifier.ts`       |
| API Client          | `src/core/api/client.ts`                   |
| Protected Routes    | `src/core/auth/ProtectedRoute.tsx`         |

## Standards

`.claude/standards/` organized by category: `frontend/`, `global/`, `testing/`, `security/`, `api/`, `backend/`. See `.claude/OWASP_RULES.md` for OWASP one-liners.

## Styles & Fonts

- `frontend/src/styles/globals.css` — Tailwind layers, reset, color tokens (light/dark)
- `frontend/src/styles/fonts.css` — `@font-face` declarations
- Self-hosted `.woff` / `.woff2` → `frontend/public/fonts/`, referenced as `url('/fonts/<file>.woff2')` with `font-display: swap`
- Design tokens in `src/styles/tokens/` (e.g. `text-display-lg`, `py-section-md`, `bg-primary`). See `DESIGN-SYSTEM.md`.

## Claude Agent SDK

```bash
pnpm agent "prompt"          # general assistance
pnpm agent:setup             # run SETUP.md
pnpm agent:review ./src      # code review
pnpm agent:cleanup           # session cleanup
```

Security hooks block: `rm -rf`, `sudo`, `chmod 777`, curl piping, env reads. Modifications to `src/core/security/*`, `src/core/auth/*`, `.env*`, `package.json` require approval. Hard-blocked: `.env.production`, `src/core/security/constantTimeCompare.ts`.

## Design to Code

| Command                                         | Purpose                              |
| ----------------------------------------------- | ------------------------------------ |
| `/design:analyze [path]`                        | Analyze screenshots → token mappings |
| `/design:build [file] --feature [name]`         | Generate component from screenshot   |
| `/design:wire [ComponentName] --feature [name]` | Wire routing + route stubs           |
| `/design:style [--edit]`                        | View / update style preferences      |
| `/planning:spec [name] "requirement"`           | Interactive feature spec interview   |

Screenshots: `docs/designs/screenshots/[page-name]/[section]-[variant][-viewport].png`. `/design:build` auto-updates `App.tsx` routes and creates stub pages for detected nav links.

## Error Learning

Errors auto-logged to `ERRORS.md` (PostToolUse hook). Run `/learn` to capture the pattern into this file. `/learn --quick "summary"` for one-liners.

### Recent Learnings

(Populated via /learn — newest first)

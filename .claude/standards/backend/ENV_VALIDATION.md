# Environment Validation

All env vars are Zod-validated at startup. App crashes immediately if validation fails.

**Why:** Fail fast on misconfiguration. No runtime surprises from missing or malformed env vars.

## Schema Location

`backend/src/config/env.ts`

```typescript
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().url(),
  // ...
});

export const env = envSchema.parse(process.env);
```

## Requirement Tiers

| Tier                       | When Required                    | Examples                                                |
| -------------------------- | -------------------------------- | ------------------------------------------------------- |
| **Always required**        | All environments                 | `DATABASE_URL`, `PORT`, `CLIENT_URL`                    |
| **Prod-only required**     | Production only, optional in dev | `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`              |
| **Optional with defaults** | Never required                   | `PORT` (default 3001), `NODE_ENV` (default development) |

## Adding New Env Vars

1. Add to `envSchema` in `backend/src/config/env.ts`
2. Decide the requirement tier:
   - Core infra (DB, ports, URLs) → required everywhere
   - External service keys → required in prod, optional in dev
   - Config with sensible defaults → optional with `.default()`
3. Add to `.env.example` with a comment
4. Use prefix validation when possible (e.g., `z.string().startsWith("sk_")`)

```typescript
// Prod-only pattern
const isProduction = process.env.NODE_ENV === "production";

MY_API_KEY: isProduction
  ? z.string().min(1)
  : z.string().min(1).optional(),
```

## Rules

- Always import `env` from `config/env.ts` — never read `process.env` directly
- Validation runs at startup — invalid config = immediate crash
- Use `z.coerce` for numbers and booleans (env vars are always strings)
- Add prefix validation for API keys when the provider has a known format

## Common Mistakes

- Reading `process.env.X` directly instead of `env.X`
- Making external service keys required in dev (blocks local development)
- Forgetting to add new vars to `.env.example`

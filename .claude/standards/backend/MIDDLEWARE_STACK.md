# Route Middleware Stack

All routes follow a consistent middleware ordering. Auth comes first — reject unauthenticated requests before spending resources on validation.

## Standard Order

```typescript
router.put(
  "/:id",
  requireAuth,        // 1. Authentication
  validateParams(...), // 2. URL params validation
  validateBody(...),   // 3. Body validation
  writeLimiter,        // 4. Rate limiting (writes only)
  handler,             // 5. Route handler
);
```

## Middleware Ordering Rules

| Position | Middleware       | Purpose                 | Required?                                    |
| -------- | ---------------- | ----------------------- | -------------------------------------------- |
| 1        | `requireAuth`    | Authenticate request    | Yes (use `optionalAuth` for mixed endpoints) |
| 2        | `validateParams` | Validate URL parameters | If route has params                          |
| 3        | `validateQuery`  | Validate query string   | If route uses query params                   |
| 4        | `validateBody`   | Validate request body   | If route accepts body                        |
| 5        | Rate limiter     | Throttle requests       | Writes and sensitive endpoints               |
| 6        | Handler          | Business logic          | Always last                                  |

## Why Auth First

- Rejects unauthenticated requests immediately (no wasted validation cycles)
- Rate limiting happens after validation to count only valid requests
- Handler is always last — receives fully validated, authenticated request

## Auth Middleware Options

```typescript
import { requireAuth, optionalAuth } from "../middleware/auth";

// Protected endpoint
router.get("/", requireAuth, handler);

// Mixed endpoint (different response for authed/anonymous)
router.get("/public", optionalAuth, handler);
```

## Common Mistakes

- Putting validation before auth (wastes resources on unauthenticated requests)
- Putting rate limiter before validation (counts invalid requests toward limit)
- Forgetting `requireAuth` on new endpoints
- Putting the handler anywhere other than last position

# Rate Limiting

All endpoints are rate-limited. Global limit applies by default; add stricter limits for sensitive writes.

**Why:** Prevents brute-force attacks, API abuse, and resource exhaustion.

## Tiers

| Tier   | Limit               | Scope               | Applied To                              |
| ------ | ------------------- | ------------------- | --------------------------------------- |
| Global | 100 req/hour per IP | All endpoints       | Automatic via `app.use(rateLimit(...))` |
| Write  | 10 req/min per IP   | Sensitive mutations | Explicit per-route middleware           |

## Global (automatic)

Applied in `backend/src/app.ts`. No action needed for new endpoints.

```typescript
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
    message: {
      success: false,
      error: { code: "RATE_LIMITED", message: "Too many requests" },
    },
  }),
);
```

## Stricter Limits (explicit)

Add to sensitive write endpoints (account changes, password resets, payment actions):

```typescript
import rateLimit from "express-rate-limit";

const writeLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    error: { code: "RATE_LIMITED", message: "Too many requests" },
  },
});

router.put("/:id", writeLimit, requireAuth, handler);
```

## Response Format

Rate limit responses use the standard error envelope:

```json
{
  "success": false,
  "error": { "code": "RATE_LIMITED", "message": "Too many requests" }
}
```

## When to Add Explicit Limits

- User profile updates
- Password changes
- Payment/billing actions
- Any endpoint that sends emails or notifications

# Error Masking

Never expose raw errors to users. Log full details server-side.

**Why:** OWASP A05:2021. Stack traces and internal messages leak implementation details to attackers.

## Frontend Rules

- Always use `formatApiError(error, action)` in catch blocks
- Never display `error.message` directly to users
- Action parameter describes what failed (e.g., "save user", "load dashboard")

```typescript
import { formatApiError } from "@/core/api/errors";

try {
  await usersService.create(data);
} catch (error) {
  toast.error(formatApiError(error, "create user"));
}
```

## Backend Rules

- All responses use `{ success, error: { code, message } }` envelope
- Unknown errors always return: `{ code: "INTERNAL_ERROR", message: "An unexpected error occurred" }`
- Log full error + stack server-side via `logger.error()`
- Stack traces only in logs when `NODE_ENV === "development"`

```typescript
// Known error - safe message
res.status(404).json({
  success: false,
  error: { code: "NOT_FOUND", message: "Resource not found" },
});

// Unknown error - generic message, full log
logger.error({ error: err.message, stack: err.stack }, "Unhandled error");
res.status(500).json({
  success: false,
  error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" },
});
```

## Common Mistakes

- Passing `error.message` directly to `toast()` or UI
- Forgetting to log the full error server-side (masked but also lost)
- Returning different error shapes from different endpoints

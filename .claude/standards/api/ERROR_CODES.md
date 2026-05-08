# Error Codes & AppError Classes

All API errors extend `AppError`. The global error handler extracts `statusCode`, `code`, and `message` consistently.

**Why:** Consistent error shapes for frontend consumption. Never throw plain `Error` in API code.

## Built-in Error Classes

| Class               | Status | Code               | Default Message           |
| ------------------- | ------ | ------------------ | ------------------------- |
| `AppError`          | 500    | `INTERNAL_ERROR`   | (custom)                  |
| `NotFoundError`     | 404    | `NOT_FOUND`        | `{resource} not found`    |
| `ValidationError`   | 400    | `VALIDATION_ERROR` | (custom) + field `errors` |
| `UnauthorizedError` | 401    | `UNAUTHORIZED`     | `Unauthorized`            |
| `ForbiddenError`    | 403    | `FORBIDDEN`        | `Access denied`           |
| `ConflictError`     | 409    | `CONFLICT`         | `Resource already exists` |

All defined in `backend/src/constants/errors.ts`.

## Usage

```typescript
import { NotFoundError, ConflictError } from "../constants/errors";

// In service layer
const user = await userRepository.findById(id);
if (!user) throw new NotFoundError("User");
```

## Adding New Error Types

1. Always extend `AppError`
2. Set `statusCode`, `code`, and default `message` in constructor
3. Add to `backend/src/constants/errors.ts`

```typescript
export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429, "RATE_LIMITED");
  }
}
```

## Global Error Handler

The handler in `middleware/error.ts` catches:

- `ZodError` → 400 with field-level details
- `PrismaClientKnownRequestError` → 409 (P2002) or 404 (P2025)
- `AppError` subclasses → their statusCode + code
- Unknown errors → 500 `INTERNAL_ERROR` (never exposes internals)

## Common Mistakes

- Throwing plain `Error` instead of `AppError` subclass
- Creating ad-hoc error responses in route handlers instead of using error classes
- Duplicating error code strings instead of using existing classes

# Response Envelope

All API responses use a consistent envelope. Frontend checks `success` first, then reads `data` or `error`.

## Success Response

```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    [key: string]: unknown;
  };
}
```

```json
{ "success": true, "data": { "id": "1", "email": "user@example.com" } }
{ "success": true, "data": [...], "meta": { "total": 42, "page": 1, "limit": 20 } }
```

## Error Response

```typescript
interface ApiError {
  success: false;
  error: { code: string; message: string; details?: Record<string, string[]> };
}
```

```json
{ "success": false, "error": { "code": "NOT_FOUND", "message": "User not found" } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid request data", "details": { "email": ["Invalid email"] } } }
```

## Rules

- Every endpoint returns the envelope — no exceptions
- Use `success()` helper from `backend/src/utils/response.ts` for success responses
- Error responses are handled by the global error handler in `middleware/error.ts`
- `meta` is currently used for pagination; open for future metadata needs
- `details` in error responses provides field-level validation errors
- Types are defined in `shared/src/types/api.ts`

## Backend Usage

```typescript
import { success } from "../utils/response";

// Single resource
res.json(success(user));

// List with pagination meta
res.json(success(result.users, { total: result.total }));
```

# Auth & Audit Headers

All authenticated API requests include Bearer token and user context headers for audit trails.

**Why:** OWASP A01 (access control via JWT) + A09 (logging via audit headers). Every request is traceable to a user.

## Headers

| Header                          | Source                       | Purpose                                        |
| ------------------------------- | ---------------------------- | ---------------------------------------------- |
| `Authorization: Bearer <token>` | localStorage `access_token`  | Authentication                                 |
| `X-User-ID`                     | localStorage `user.id`       | Audit trail / request tracing                  |
| `X-Username`                    | localStorage `user.username` | Audit trail / request tracing                  |
| `X-CSRF-Token`                  | Cookie `csrf_token`          | CSRF protection (see csrf-protection standard) |

## Rules

- **Auth headers drive authentication** — JWT token is the sole auth decision source
- **Audit headers are for logging only** — `X-User-ID` and `X-Username` are never used for authorization
- Both are injected automatically by `APIClient` — no manual action needed
- Missing token triggers automatic redirect to `/login`
- 401/403 responses trigger automatic logout + redirect
- Auth endpoints (`/token`) skip Bearer injection

## User Data Validation

User info from localStorage is validated with Zod before injection:

```typescript
const UserInfoSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
});
```

Invalid data is silently ignored (no headers sent, no crash).

## Backend Logging

Backend should log `X-User-ID` on every request for traceability:

```typescript
logger.info({ userId: req.headers["x-user-id"], path: req.path }, "Request");
```

## Common Mistakes

- Using `X-User-ID` header for authorization decisions (use JWT claims instead)
- Manually setting auth headers instead of relying on `APIClient`
- Storing sensitive data in localStorage user object beyond id/username

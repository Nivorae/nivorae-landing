# CSRF Protection

All state-changing requests include a CSRF token via double-submit cookie pattern.

**Why:** OWASP A01:2021. Prevents cross-site request forgery on POST/PUT/PATCH/DELETE.

## How It Works

1. Backend sets `csrf_token` cookie
2. Frontend `APIClient` reads cookie and sends as `X-CSRF-Token` header
3. Backend validates header matches cookie
4. Only applied to state-changing methods: `POST`, `PUT`, `PATCH`, `DELETE`

## Frontend

Handled automatically by `APIClient` — no manual action needed.

```typescript
// APIClient auto-injects X-CSRF-Token on state-changing requests
const client = new APIClient({
  enableCsrf: true, // default
  csrfHeaderName: "X-CSRF-Token",
  csrfCookieName: "csrf_token",
});
```

- CSRF is enabled by default (opt-out, not opt-in)
- GET/HEAD/OPTIONS requests skip CSRF
- Cookie name and header name are configurable

## Backend

- Set `csrf_token` cookie on session creation
- Validate `X-CSRF-Token` header matches cookie on state-changing requests
- Use `SameSite=Strict` or `SameSite=Lax` on the cookie

## Common Mistakes

- Disabling CSRF with `enableCsrf: false` without an alternative
- Forgetting to set the cookie server-side
- Not validating the header on the backend

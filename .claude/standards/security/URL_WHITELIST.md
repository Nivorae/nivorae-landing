# URL Whitelist (SSRF Prevention)

Every frontend API call must validate its path against a whitelist before execution. No exceptions.

**Why:** Proactive OWASP A10:2021 (SSRF) compliance. Prevents user input from constructing malicious URLs.

## Rules

- Each feature defines its own whitelist (e.g., `USERS_WHITELIST`, `ORDERS_WHITELIST`)
- Services import only the whitelist they need
- Validate before every `apiClient.get/post/put/delete` call
- Query params are stripped before validation (prefix match only)

## Pattern

```typescript
import { isPathAllowed, USERS_WHITELIST } from "@/core/security/urlWhitelist";

const path = `/users/${id}`;
if (!isPathAllowed(path, USERS_WHITELIST)) {
  throw new Error(`Path not in whitelist: ${path}`);
}
await apiClient.get(path);
```

## Adding New Endpoints

1. Add prefix to the appropriate whitelist in `src/core/security/urlWhitelist.ts`
2. Import that whitelist in your service file
3. Validate path before every API call

## Common Mistakes

- Calling `apiClient` directly without whitelist check
- Using a combined/global whitelist instead of feature-specific ones
- Forgetting to strip query params (handled by `isPathAllowed`)

# Security Utilities

This directory contains security utilities that implement defense-in-depth patterns aligned with OWASP Top 10 (2021).

## Utilities

### `constantTimeCompare.ts`

**Purpose**: Timing-safe string comparison to prevent timing attacks.

**Security Reference**:

- CWE-208: Observable Timing Discrepancy
- OWASP A07:2021 - Identification and Authentication Failures

**Usage**:

```typescript
import { constantTimeCompare } from "@/core/security/constantTimeCompare";

// Password confirmation in signup forms
if (!constantTimeCompare(password, confirmPassword)) {
  setError("Passwords do not match");
}
```

**Why not use `===`?**

Standard string comparison (`===`) exits early on first mismatch. An attacker can measure response times to infer how many characters matched, gradually revealing the secret.

```typescript
// BAD: Timing attack vulnerable
if (password === confirmPassword) { ... }

// GOOD: Constant-time comparison
if (constantTimeCompare(password, confirmPassword)) { ... }
```

---

### `urlWhitelist.ts`

**Purpose**: Prevent Server-Side Request Forgery (SSRF) by validating API paths against a whitelist.

**Security Reference**:

- CWE-918: Server-Side Request Forgery (SSRF)
- OWASP A10:2021 - Server-Side Request Forgery

**Usage**:

```typescript
import { USERS_WHITELIST, isPathAllowed } from "@/core/security/urlWhitelist";

const path = `/users/${userId}`;

// Validate before making request
if (!isPathAllowed(path, USERS_WHITELIST)) {
  throw new Error(`Path not in whitelist: ${path}`);
}

// Safe to make request
await apiClient.get(path);
```

**Pattern**:

1. Define domain-specific whitelists
2. Import relevant whitelist in service files
3. Validate every constructed path before API calls

---

## Adding New Security Utilities

When adding security utilities:

1. Document the CWE/OWASP reference
2. Explain the attack it prevents
3. Provide BAD/GOOD code examples
4. Link to `docs/SECURITY.md` for full documentation

---

## Related Documentation

- [Security Patterns](../../docs/SECURITY.md) - Complete OWASP Top 10 guide
- [OWASP Rules](./.claude/OWASP_RULES.md) - Quick reference for AI assistants

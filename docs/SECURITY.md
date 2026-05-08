# Security Patterns

This document outlines the security patterns used in this template, aligned with OWASP Top 10 (2021).

## Overview

This template includes battle-tested security patterns extracted from production applications. Each pattern addresses specific vulnerabilities with concrete code examples.

---

## OWASP Top 10 (2021) Coding Rules

Every file in this template follows these rules. When contributing, ensure compliance.

### 1. Broken Access Control (A01)

**Rule**: Every request must be authorized server-side.

**Pattern**: Never trust UI for access control; no ID-only checks; no "hidden" buttons.

**In Template**: `ProtectedRoute` validates permissions; API whitelist prevents unauthorized paths.

```typescript
// BAD: Hiding button but not checking server-side
{isAdmin && <DeleteButton />}

// GOOD: Server validates + UI hides
// Server enforces delete permission, UI only controls visibility
{canDelete && <DeleteButton onClick={handleDelete} />}
```

**Files**: `src/core/auth/ProtectedRoute.tsx`, `src/core/auth/usePermissions.ts`

---

### 2. Cryptographic Failures (A02)

**Rule**: Always use TLS, strong algorithms; never roll your own crypto.

**Pattern**: Protect secrets at rest and in transit.

**In Template**: Environment variables for secrets; `constantTimeCompare` for sensitive comparisons.

```typescript
// BAD: Hardcoded secrets
const API_KEY = "sk-1234567890";

// GOOD: Environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
```

**Files**: `.env.example`, `src/core/security/constantTimeCompare.ts`

---

### 3. Injection (A03)

**Rule**: Never concatenate untrusted data into SQL, NoSQL, OS commands, or URLs.

**Pattern**: Always use parameterized queries and safe APIs.

**In Template**: URL whitelist prevents path injection; Zod validates all user input.

```typescript
// BAD: String concatenation with user input
const path = `/api/${userInput}`;

// GOOD: Whitelist validation
if (!isPathAllowed(path, ALLOWED_PATHS)) {
  throw new Error(`Path not in whitelist: ${path}`);
}
```

**Files**: `src/core/security/urlWhitelist.ts`, `src/core/validation/`

---

### 4. Insecure Design (A04)

**Rule**: Design for security from the start (threat modeling, secure workflows, safe defaults).

**Pattern**: Don't bolt security on at the end.

**In Template**: Feature-based architecture with security utilities in `src/core/security/`.

---

### 5. Security Misconfiguration (A05)

**Rule**: Disable debug/prod leaks, use secure defaults, lock down admin consoles.

**Pattern**: Generic error messages; no stack traces in production.

**In Template**: `formatApiError()` sanitizes error messages.

```typescript
// BAD: Exposing internal details
catch (e) {
  return res.json({ error: e.stack });
}

// GOOD: Generic message
catch (e) {
  return res.json({ error: "Operation failed. Please try again." });
}
```

**Files**: `src/core/api/errors.ts`, `src/core/errors/errorClassifier.ts`

---

### 6. Vulnerable and Outdated Components (A06)

**Rule**: Keep frameworks, libraries, containers patched.

**Pattern**: Track dependencies; avoid unsupported/known-vulnerable versions.

**In Template**: `package-lock.json` committed; run `npm audit` regularly.

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix
```

---

### 7. Identification and Authentication Failures (A07)

**Rule**: Strong auth: MFA where needed, secure session handling, lockouts, safe password storage.

**Pattern**: Slow hashes with salts; timing-safe comparisons.

**In Template**: `constantTimeCompare()` for password confirmation; JWT with expiry.

```typescript
// BAD: Direct comparison leaks timing info
if (password === confirmPassword) { ... }

// GOOD: Timing-safe comparison
import { constantTimeCompare } from "@/core/security/constantTimeCompare";

if (constantTimeCompare(password, confirmPassword)) { ... }
```

**Files**: `src/core/security/constantTimeCompare.ts`, `src/core/validation/rules/password.rules.ts`

---

### 8. Software and Data Integrity Failures (A08)

**Rule**: Verify updates and CI/CD artifacts; sign code where possible.

**Pattern**: Avoid blindly trusting plugins or supply-chain components.

**In Template**: Lockfile (`package-lock.json`) committed; use known registries only.

---

### 9. Security Logging and Monitoring Failures (A09)

**Rule**: Log security-relevant events (logins, permission changes, errors).

**Pattern**: Monitor and alert on suspicious behavior.

**In Template**: `X-User-ID` and `X-Username` headers for audit trails; error boundaries log failures.

```typescript
// API client injects user context for server-side logging
config.headers["X-User-ID"] = userId;
config.headers["X-Username"] = username;
```

**Files**: `src/core/api/client.ts`, `src/core/errors/ErrorBoundary.tsx`

---

### 10. Server-Side Request Forgery - SSRF (A10)

**Rule**: Never let user-controlled URLs be fetched freely by backend.

**Pattern**: Validate/allowlist destinations; restrict network access.

**In Template**: `URL_WHITELIST` pattern with prefix matching (CWE-918).

```typescript
// BAD: User-controlled path without validation
const path = `/api/${userInput}`;
await fetch(path);

// GOOD: Whitelist validation before request
import { isPathAllowed, USERS_WHITELIST } from "@/core/security/urlWhitelist";

const path = `/users/${encodeURIComponent(userId)}`;
if (!isPathAllowed(path, USERS_WHITELIST)) {
  throw new Error(`Path not in whitelist: ${path}`);
}
await apiClient.get(path);
```

**Files**: `src/core/security/urlWhitelist.ts`, `src/features/_example/services/example.service.ts`

---

## Template-Specific Security Patterns

### 1. URL Whitelist Pattern (CWE-918)

Prevents SSRF by validating all API paths against a whitelist before requests.

**Implementation**:

1. Define domain-specific whitelists in `urlWhitelist.ts`
2. Import relevant whitelist in service files
3. Validate every constructed path before API calls

```typescript
// Define whitelist
export const USERS_WHITELIST = ["/users", "/roles"] as const;

// Use in service
const path = `/users/${id}`;
if (!isPathAllowed(path, USERS_WHITELIST)) {
  throw new Error(`Path not in whitelist: ${path}`);
}
```

### 2. Timing-Safe Comparison (CWE-208)

Prevents timing attacks by comparing strings in constant time.

**Why `===` is vulnerable**: Standard comparison exits early on first mismatch. Attackers can measure response times to infer how many characters matched.

```typescript
// Uses bitwise XOR to compare ALL characters
export function constantTimeCompare(a: string, b: string): boolean {
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
```

### 3. Path Traversal Prevention

Vite config includes `resolveAndValidatePath()` to prevent path traversal in aliases.

```typescript
function resolveAndValidatePath(
  basePath: string,
  relativePath: string,
): string {
  const resolvedPath = path.normalize(path.resolve(basePath, relativePath));
  if (!resolvedPath.startsWith(basePath)) {
    throw new Error(`Path traversal detected: ${relativePath}`);
  }
  return resolvedPath;
}
```

### 4. Bearer Token Interceptors

API client automatically injects authentication tokens and handles auth failures.

```typescript
// Request: Add Bearer token
config.headers.Authorization = `Bearer ${token}`;

// Response: Handle 401/403
if (status === 401 || status === 403) {
  handleAuthFailure(); // Clear tokens, redirect to login
}
```

### 5. User Context Headers

All API requests include user context for server-side audit logging.

```typescript
config.headers["X-User-ID"] = userId;
config.headers["X-Username"] = username;
```

---

## HTTP Security Headers (OWASP A05)

The template configures security headers for both development and production environments.

### Configured Headers

| Header                      | Value                                 | Purpose                                      |
| --------------------------- | ------------------------------------- | -------------------------------------------- |
| `Content-Security-Policy`   | See below                             | Prevents XSS by controlling resource loading |
| `X-Content-Type-Options`    | `nosniff`                             | Prevents MIME type sniffing                  |
| `X-Frame-Options`           | `DENY`                                | Prevents clickjacking attacks                |
| `X-XSS-Protection`          | `1; mode=block`                       | Legacy XSS filter (for older browsers)       |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`     | Controls referrer information leakage        |
| `Permissions-Policy`        | `camera=(), microphone=()...`         | Restricts browser features                   |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS (production only)               |

### Content-Security-Policy (CSP)

The CSP header prevents XSS attacks by specifying which resources can be loaded:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https:;
object-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests
```

**Directive Breakdown**:

- `default-src 'self'` - Only allow resources from same origin by default
- `script-src 'self'` - Only allow scripts from same origin (no inline scripts in production)
- `style-src 'self' 'unsafe-inline'` - Allow styles from same origin + inline styles (required for Tailwind/CSS-in-JS)
- `img-src 'self' data: https:` - Allow images from same origin, data URIs, and any HTTPS source
- `font-src 'self' data:` - Allow fonts from same origin and data URIs
- `connect-src 'self' https:` - Allow API calls to same origin and HTTPS endpoints
- `object-src 'none'` - Block `<object>`, `<embed>`, and `<applet>` elements (prevents plugin-based attacks)
- `frame-ancestors 'none'` - Prevent embedding in any iframe (clickjacking protection)
- `base-uri 'self'` - Restrict `<base>` tag to same origin
- `form-action 'self'` - Restrict form submissions to same origin
- `upgrade-insecure-requests` - Automatically upgrade HTTP to HTTPS

### Customizing CSP

**Adding External Resources**:

If you need to load resources from external sources (e.g., Google Fonts, CDN scripts):

```typescript
// vite.config.ts - Development
"Content-Security-Policy":
  "default-src 'self'; script-src 'self' https://cdn.example.com; font-src 'self' https://fonts.gstatic.com; ..."

// vercel.json / netlify.toml - Production
// Update the CSP value accordingly
```

**For Google Fonts**:

```
font-src 'self' https://fonts.gstatic.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

**For Analytics (e.g., Plausible)**:

```
script-src 'self' https://plausible.io;
connect-src 'self' https://plausible.io;
```

### Configuration Files

- **Development**: `vite.config.ts` - Headers served via custom Vite plugin
- **Vercel**: `vercel.json` - Headers in `headers` array
- **Netlify**: `netlify.toml` - Headers in `[[headers]]` sections
- **Fallback**: `index.html` - `<meta http-equiv="Content-Security-Policy">` tag

**Notes**:

- HTTP headers take precedence over meta tags
- `frame-ancestors` directive only works in HTTP headers (use `X-Frame-Options` as backup)
- Development CSP includes `'unsafe-inline'` for scripts to support Vite HMR

---

## Security Checklist

Before deploying, verify:

- [ ] All API paths validated against whitelist (OWASP A01, A10)
- [ ] Password comparisons use `constantTimeCompare` (OWASP A02, A07)
- [ ] No hardcoded secrets in code (OWASP A02)
- [ ] Environment variables for all configuration (OWASP A05)
- [ ] Error messages are generic, no stack traces (OWASP A05)
- [ ] User input validated with Zod schemas (OWASP A03)
- [ ] Dependencies version-locked and audited (OWASP A06)
- [ ] User context headers sent with all API requests (OWASP A09)
- [ ] `npm audit` shows no high/critical vulnerabilities (OWASP A06)
- [ ] Security headers configured (CSP, X-Frame-Options, Referrer-Policy, etc.)
- [ ] CSP customized for external resources if needed (fonts, analytics, CDN)

---

## References

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [CWE-208: Observable Timing Discrepancy](https://cwe.mitre.org/data/definitions/208.html)
- [CWE-918: Server-Side Request Forgery](https://cwe.mitre.org/data/definitions/918.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)

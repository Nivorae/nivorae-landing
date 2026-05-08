# Feature Spec: Claude Cleanup

<!-- Pick one feature from PROJECT_SPEC.md Section 3 and expand it into a build-ready spec. -->
<!-- Replace all [PLACEHOLDER] values. Delete HTML comments when done. -->

---

## 1. Overview

| Field      | Value                                                       |
| ---------- | ----------------------------------------------------------- |
| Feature    | Claude Cleanup                                              |
| Task ID    | [TASK-ID] <!-- assign when orchestrator generates tasks --> |
| Branch     | feature/claude-cleanup                                      |
| Owner      | [TERMINAL] <!-- e.g. Terminal 1, Terminal 2 -->             |
| Depends On | None                                                        |
| Estimate   | TBD                                                         |

**User Story:**

As a developer, I want a refined and simplified `.claude` directory structure so that configuration is easier to navigate, maintain, and extend.

---

## 2. Requirements

### Must Have

- Audit all `.claude/` subdirectories and identify redundant, unused, or overlapping files
- Consolidate or remove hook scripts that serve duplicate purposes
- Simplify standards file organization where categories overlap
- Ensure all remaining files are referenced from CLAUDE.md or active configurations

### Should Have

- [Requirement] <!-- e.g. Export user list as CSV -->

### Nice to Have

- [Requirement] <!-- e.g. Bulk user actions (delete, role change) -->

---

## 3. API Endpoints

<!-- One block per endpoint. Follow middleware order from .claude/standards/backend/MIDDLEWARE_STACK.md -->
<!-- Response format follows .claude/standards/api/RESPONSE_ENVELOPE.md -->
<!-- List endpoints follow .claude/standards/api/PAGINATION_FILTERING.md -->

### [METHOD] [PATH]

<!-- e.g. GET /api/admin/users -->

**Middleware:** `requireAuth` → `validateQuery(schema)` → `handler`

<!-- Adjust per endpoint. Writes add: validateBody + writeLimiter -->

**Input:**

```json
{
  "[field]": "[type — constraint]"
}
```

<!-- Example:
{
  "page": "number — default 1",
  "limit": "number — default 20, max 100",
  "role": "string? — 'USER' | 'ADMIN'"
}
-->

**Success (200):**

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

<!-- Example:
{
  "success": true,
  "data": [{ "id": "usr_1", "email": "user@example.com", "role": "USER" }],
  "meta": { "total": 42, "page": 1, "limit": 20 }
}
-->

**Errors:**

| Status | Code               | When                                         |
| ------ | ------------------ | -------------------------------------------- |
| 400    | `VALIDATION_ERROR` | [trigger] <!-- e.g. Invalid query params --> |
| 401    | `UNAUTHORIZED`     | Missing or invalid auth                      |
| 403    | `FORBIDDEN`        | [trigger] <!-- e.g. Non-admin user -->       |

<!-- Add 404, 409, 429 rows as needed. Error classes defined in .claude/standards/api/ERROR_CODES.md -->

---

### [METHOD] [PATH]

<!-- Repeat the block above for each endpoint -->

---

## 4. Database Schema

<!-- Prisma syntax. Soft deletes follow .claude/standards/backend/SOFT_DELETES.md -->

### New Models

```prisma
model [ModelName] {
  id        String    @id @default(cuid())
  [field]   [Type]    [constraints]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?              // soft delete (if applicable)

  @@index([[indexed_fields]])
}
```

<!-- Example:
model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  action    String
  target    String
  metadata  Json?
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action, createdAt])
}
-->

### Modified Models

<!-- List changes to existing models, or "None" -->

```prisma
model [ExistingModel] {
  // ADD:
  [newField]  [Type]  [constraints]
}
```

### Migrations

- [ ] Run `pnpm --filter backend exec prisma migrate dev --name [migration_name]`
- [ ] If soft-delete model: add to `softDeleteModels` array in `backend/src/config/prisma.ts`

---

## 5. Frontend Components

<!-- List React components, hooks, and services for this feature. -->
<!-- Skip this section for backend-only tasks. -->

```
[Component].tsx     - [description]
[Component].tsx     - [description]
use[Hook].ts        - [description]
[domain]Service.ts  - [description]
```

<!-- Example:
UserTable.tsx       - Paginated table of all users with role badges
UserRoleDialog.tsx  - Modal to change a user's role
useAdminUsers.ts    - Hook for fetching and filtering user list
adminService.ts     - API calls with URL whitelist validation
-->

---

## 6. Business Logic

<!-- Numbered steps per operation. Keep it linear — no nested sub-flows. -->

### [Operation Name]

<!-- e.g. List Users (Admin) -->

1. [Step 1] <!-- e.g. Validate query params (page, limit, role filter) -->
2. [Step 2] <!-- e.g. Check user has ADMIN role -->
3. [Step 3] <!-- e.g. Query users with pagination, exclude soft-deleted -->
4. [Step 4] <!-- e.g. Return paginated list with total count -->

### [Operation Name]

<!-- Repeat for each operation (create, update, delete, etc.) -->

1. [Step]
2. [Step]

---

## 7. Validation Rules

<!-- Per field. Schemas go in shared/src/schemas/[domain].schema.ts -->
<!-- Follow .claude/standards/api/REQUEST_VALIDATION.md -->

| Field   | Type   | Constraints |
| ------- | ------ | ----------- |
| [field] | [type] | [rules]     |

<!-- Example:
| email    | string | required, RFC 5322, max 255, lowercase normalized |
| role     | enum   | "USER" | "ADMIN", required                        |
| page     | number | positive integer, default 1 (z.coerce)            |
| limit    | number | 1-100, default 20 (z.coerce)                      |
| search   | string | optional, max 255                                 |
-->

**Zod Schema:**

```typescript
// shared/src/schemas/[domain].schema.ts

export const [schemaName] = z.object({
  // [field]: z.[type]().[constraint](),
});

export type [TypeName] = z.infer<typeof [schemaName]>;
```

<!-- Example:
export const adminListUsersSchema = paginationSchema
  .merge(searchSchema)
  .merge(z.object({
    role: z.enum(["USER", "ADMIN"]).optional(),
    includeDeleted: z.coerce.boolean().default(false),
  }));

export type AdminListUsersQuery = z.infer<typeof adminListUsersSchema>;
-->

---

## 8. Security

<!-- Reference .claude/OWASP_RULES.md for patterns. List specific threats for this feature. -->

| OWASP | Threat   | Mitigation   |
| ----- | -------- | ------------ |
| [A0X] | [threat] | [mitigation] |

<!-- Example:
| A01 | Non-admin accesses admin endpoints  | requireAuth + role check in service layer          |
| A03 | SQL injection via search param       | Zod validation + Prisma parameterized queries      |
| A05 | Stack traces leaked in admin errors  | Global error handler masks internals               |
| A07 | Brute-force admin login              | Rate limiting (10 req/min on writes)               |
| A09 | Admin actions not traceable          | X-User-ID audit header + Pino structured logging   |
| A10 | SSRF via admin API calls             | URL whitelist validation (isPathAllowed)            |
-->

---

## 9. Error Handling

<!-- Use AppError subclasses from .claude/standards/api/ERROR_CODES.md -->
<!-- Never throw plain Error in API code -->

**Service layer pattern:**

```typescript
import { NotFoundError, ForbiddenError } from "../constants/errors";

// [describe when each error is thrown]
const [resource] = await [repository].findById(id);
if (![resource]) throw new NotFoundError("[Resource]");
if (![authCheck]) throw new ForbiddenError("[reason]");
```

<!-- Example:
import { NotFoundError, ForbiddenError } from "../constants/errors";

const user = await userRepository.findById(id);
if (!user) throw new NotFoundError("User");
if (req.auth.role !== "ADMIN") throw new ForbiddenError("Admin access required");
-->

**Frontend pattern:**

```typescript
import { formatApiError } from "@/core/api/errors";

try {
  // API call
} catch (error) {
  toast.error(formatApiError(error, "[operation]"));
}
```

---

## 10. Testing

<!-- Follow .claude/standards/testing/TEST_WRITING.md -->

### Unit Tests

- [ ] [test description] <!-- e.g. Zod schema validates valid admin query -->
- [ ] [test description] <!-- e.g. Zod schema rejects invalid role value -->
- [ ] [test description]

### Integration Tests

- [ ] [test description] <!-- e.g. GET /api/admin/users returns paginated list -->
- [ ] [test description] <!-- e.g. GET /api/admin/users rejects non-admin user (403) -->
- [ ] [test description]

### E2E Tests

- [ ] [test description] <!-- e.g. Admin logs in → navigates to dashboard → sees user list -->

**Coverage target:** > [PERCENTAGE]% <!-- e.g. 80% -->

---

## 11. Dependencies

### External Packages

| Package   | Version   | Purpose |
| --------- | --------- | ------- |
| [package] | [version] | [why]   |

<!-- Example:
| recharts  | ^2.10  | Dashboard charts     |
| date-fns  | ^3.0   | Date formatting      |
-->

<!-- Or: "None — uses existing project dependencies" -->

### Internal Services

- [service] <!-- e.g. userService (existing), authMiddleware (existing) -->

---

## 12. File Ownership

<!-- For orchestrator parallel safety. List every file this task creates or modifies. -->
<!-- Follow .claude/standards/backend/LAYERED_ARCHITECTURE.md for backend file naming. -->

### Creates

```
backend/src/routes/[domain].ts
backend/src/services/[domain].service.ts
backend/src/repositories/[domain].repository.ts
frontend/src/features/[domain]/components/[Component].tsx
frontend/src/features/[domain]/hooks/use[Hook].ts
frontend/src/features/[domain]/services/[domain]Service.ts
frontend/src/features/[domain]/types/[domain].types.ts
frontend/src/features/[domain]/index.ts
shared/src/schemas/[domain].schema.ts
```

### Modifies

```
backend/src/app.ts                          <!-- mount new routes -->
frontend/src/App.tsx                        <!-- add route -->
frontend/src/core/security/urlWhitelist.ts  <!-- add whitelist -->
```

### Shared Files (coordinate with other tasks)

```
prisma/schema.prisma                        <!-- new model -->
```

---

## 13. Performance

| Endpoint   | p95 Target |
| ---------- | ---------- |
| [endpoint] | [target]   |

<!-- Example:
| GET /api/admin/users     | < 300ms |
| PUT /api/admin/users/:id | < 500ms |
-->

---

## 14. Acceptance Criteria

<!-- Maps to PROJECT_SPEC.md Section 9 (Definition of Done). Check each when done. -->

- [ ] All requirements from Section 2 implemented
- [ ] All endpoints from Section 3 working
- [ ] Frontend components from Section 5 built (if applicable)
- [ ] Zod schemas in `@repo/shared` with exported types
- [ ] AppError classes used (no plain `Error` throws)
- [ ] URL whitelist updated for new API paths
- [ ] Middleware order correct (auth → validate → rate limit → handler)
- [ ] Soft deletes implemented (if applicable)
- [ ] Unit + integration tests passing (> [PERCENTAGE]% coverage)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No lint warnings (`pnpm lint`)
- [ ] Security review passed (`pnpm agent:complete-review`)
- [ ] WCAG 2.2 Level AA (if frontend components)

---

## 15. Out of Scope

<!-- Future enhancements NOT included in this spec. Prevents scope creep. -->

- [Enhancement 1] <!-- e.g. Admin dashboard analytics charts (Phase 3) -->
- [Enhancement 2] <!-- e.g. Bulk import/export users via CSV -->

---

## Standards Reference

<!-- Don't re-explain these — read the source files for patterns. -->

| Standard               | Path                                                |
| ---------------------- | --------------------------------------------------- |
| Response Envelope      | `.claude/standards/api/RESPONSE_ENVELOPE.md`        |
| Error Codes            | `.claude/standards/api/ERROR_CODES.md`              |
| Request Validation     | `.claude/standards/api/REQUEST_VALIDATION.md`       |
| Pagination & Filtering | `.claude/standards/api/PAGINATION_FILTERING.md`     |
| Layered Architecture   | `.claude/standards/backend/LAYERED_ARCHITECTURE.md` |
| Soft Deletes           | `.claude/standards/backend/SOFT_DELETES.md`         |
| Middleware Stack       | `.claude/standards/backend/MIDDLEWARE_STACK.md`     |
| Env Validation         | `.claude/standards/backend/ENV_VALIDATION.md`       |
| OWASP Rules            | `.claude/OWASP_RULES.md`                            |
| URL Whitelist          | `.claude/standards/security/URL_WHITELIST.md`       |
| Test Writing           | `.claude/standards/testing/TEST_WRITING.md`         |

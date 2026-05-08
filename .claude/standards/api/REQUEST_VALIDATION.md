# Request Validation

All request data is validated with Zod schemas from the `shared/` package. Schemas are the single source of truth for both validation and TypeScript types.

**Why:** Type safety + validation consistency across the monorepo. One schema prevents frontend/backend drift.

## Schema Location

- **Shared schemas**: `shared/src/schemas/` — used by both frontend and backend
- **Common schemas**: `shared/src/schemas/common.ts` — pagination, search, timestamps
- **Domain schemas**: `shared/src/schemas/[domain].schema.ts` — e.g., `user.schema.ts`

## Backend Middleware

Three validators strip unknown fields automatically:

```typescript
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validate";

router.get("/", validateQuery(listUsersQuerySchema), handler);
router.get("/:id", validateParams(userIdParamSchema), handler);
router.put(
  "/:id",
  validateParams(userIdParamSchema),
  validateBody(updateUserSchema),
  handler,
);
```

- `validateBody(schema)` — validates `req.body`
- `validateParams(schema)` — validates `req.params`
- `validateQuery(schema)` — validates `req.query`
- All three strip unknown fields (Zod's `.safeParse` + overwrite)
- Invalid data throws `ZodError` → caught by global error handler → 400 response

## Type Generation

Export inferred types alongside schemas:

```typescript
export const createUserSchema = z.object({ ... });
export type CreateUserInput = z.infer<typeof createUserSchema>;
```

## Composing Schemas

Extend common schemas with domain-specific filters:

```typescript
export const listUsersQuerySchema = paginationSchema
  .merge(searchSchema)
  .merge(userFilterSchema);
```

## Adding New Endpoints

1. Define schema in `shared/src/schemas/[domain].schema.ts`
2. Export schema + inferred type
3. Use `validateBody/Params/Query` middleware in route
4. Import type in service layer for type safety

## Common Mistakes

- Defining schemas in backend only (breaks frontend type sharing)
- Forgetting to export the inferred type alongside the schema
- Not using `z.coerce` for query params (they arrive as strings)

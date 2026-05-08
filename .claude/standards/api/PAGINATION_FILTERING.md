# Pagination & Filtering

All list endpoints use page-based pagination with shared schemas. Compose domain-specific filters on top of common schemas.

## Base Schemas

Defined in `shared/src/schemas/common.ts`:

```typescript
// Pagination: page (default 1), limit (default 20, max 100)
const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Search + sort
const searchSchema = z.object({
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Timestamp filters
const timestampSchema = z.object({
  createdAfter: z.coerce.date().optional(),
  createdBefore: z.coerce.date().optional(),
});
```

## Composing Domain Queries

Merge common schemas with domain-specific filters:

```typescript
const userFilterSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).optional(),
  includeDeleted: z.coerce.boolean().default(false),
});

export const listUsersQuerySchema = paginationSchema
  .merge(searchSchema)
  .merge(userFilterSchema);
```

## Response Meta

List endpoints return `meta.total` for the frontend to calculate total pages:

```typescript
res.json(success(result.users, { total: result.total }));
```

## Rules

- Page-based pagination for all list endpoints
- Default: page 1, limit 20, max limit 100
- Use `z.coerce` for all query params (they arrive as strings)
- Always return `meta.total` in list responses
- Compose schemas using `.merge()` — don't redefine pagination per endpoint

## Common Mistakes

- Redefining page/limit in each domain schema instead of merging `paginationSchema`
- Forgetting `z.coerce` on number/boolean query params
- Not returning `meta.total` (breaks frontend pagination controls)

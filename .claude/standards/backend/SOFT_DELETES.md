# Soft Deletes

Opt-in per model. Soft-deleted records have `deletedAt` set and are auto-filtered from queries.

**Why:** Preserve data for audit trails and recovery. Hard deletes lose data permanently.

## How It Works

1. Prisma extension in `backend/src/config/prisma.ts` auto-filters `deletedAt: null` on `findFirst`, `findMany`, `findUnique`
2. Models must be registered in the `softDeleteModels` array to get auto-filtering
3. Repository provides explicit `softDelete()` method

## Opting In

1. Add `deletedAt DateTime?` to your Prisma model
2. Add model name to `softDeleteModels` array in `config/prisma.ts`
3. Add `softDelete()` method to the repository

```typescript
// config/prisma.ts
const softDeleteModels = ["User", "Post"]; // Add new model here

// repository
async softDelete(id: string) {
  return prisma.myModel.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}
```

## Querying Deleted Records

The auto-filter only applies to registered models. To include deleted records, use the `includeDeleted` query param pattern:

```typescript
const where = {
  ...(!includeDeleted && { deletedAt: null }),
};
```

## Rules

- Soft deletes are opt-in — not every model needs them
- Never call `prisma.model.delete()` on soft-delete models
- Use `softDelete()` repository method instead
- Auto-filtering only works on `findFirst`, `findMany`, `findUnique`
- `count`, `aggregate`, and raw queries are NOT auto-filtered

## Common Mistakes

- Forgetting to add the model to `softDeleteModels` array (auto-filter won't apply)
- Using `prisma.model.delete()` instead of `softDelete()` on opted-in models
- Assuming `count()` auto-filters deleted records (it doesn't)

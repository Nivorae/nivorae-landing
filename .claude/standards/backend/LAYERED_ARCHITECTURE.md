# Layered Architecture

Backend follows Route → Service → Repository. Each layer has a single responsibility. Routes never call repositories directly.

## Layers

| Layer          | Location                              | Responsibility                                            |
| -------------- | ------------------------------------- | --------------------------------------------------------- |
| **Route**      | `routes/[domain].ts`                  | HTTP concerns: middleware, request/response, status codes |
| **Service**    | `services/[domain].service.ts`        | Business logic, validation, orchestration                 |
| **Repository** | `repositories/[domain].repository.ts` | Data access, Prisma queries                               |

## Rules

- Routes call services, never repositories
- Services call repositories and other services
- Repositories only interact with Prisma — no business logic
- Each layer is a singleton class exported as a const instance
- Types come from `@repo/shared` (schemas) or `backend/src/types/` (internal)

## Example Flow

```
GET /api/users/:id
│
├─ Route: validateParams → requireAuth → handler
│   └─ calls userService.getById(req.params.id)
│
├─ Service: business logic + error throwing
│   └─ calls userRepository.findById(id)
│   └─ if (!user) throw new NotFoundError("User")
│
└─ Repository: Prisma query
    └─ prisma.user.findUnique({ where: { id } })
```

## File Naming

```
backend/src/
├─ routes/users.ts             # HTTP layer
├─ services/user.service.ts     # Business logic
├─ repositories/user.repository.ts  # Data access
└─ types/index.ts               # Internal types
```

## Singleton Pattern

```typescript
class UserService {
  async getById(id: string) { ... }
}
export const userService = new UserService();
```

## Common Mistakes

- Calling `prisma.*` directly in route handlers
- Putting business logic (validation, authorization) in repositories
- Putting HTTP concerns (status codes, response formatting) in services

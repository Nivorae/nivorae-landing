## Coding style best practices

- **Consistent Naming Conventions**: Establish and follow naming conventions for variables, functions, classes, and files across the codebase
- **Automated Formatting**: Maintain consistent code style (indenting, line breaks, etc.)
- **Meaningful Names**: Choose descriptive names that reveal intent; avoid abbreviations and single-letter variables except in narrow contexts
- **Small, Focused Functions**: Keep functions small and focused on a single task for better readability and testability
- **Consistent Indentation**: Use consistent indentation (spaces or tabs) and configure your editor/linter to enforce it
- **Remove Dead Code**: Delete unused code, commented-out blocks, and imports rather than leaving them as clutter
- **Backward compatibility only when required:** Unless specifically instructed otherwise, assume you do not need to write additional code logic to handle backward compatibility.
- **DRY Principle**: Avoid duplication by extracting common logic into reusable functions or modules
- **Naming Conventions**: Follow these rules, enforced by `@typescript-eslint/naming-convention`:

  | Target             | Convention                                                       | Examples                                 |
  | ------------------ | ---------------------------------------------------------------- | ---------------------------------------- |
  | Variables          | camelCase                                                        | `userName`, `orderList`, `isActive`      |
  | Functions          | camelCase                                                        | `getUserData()`, `fetchOrderList()`      |
  | Parameters         | camelCase                                                        | `userId`, `pageSize`                     |
  | React Components   | PascalCase (bare, no suffix)                                     | `ExampleCard`, `ProtectedRoute`          |
  | Types / Interfaces | PascalCase                                                       | `UserData`, `ExampleItem`                |
  | Enums              | PascalCase                                                       | `UserRole`, `OrderStatus`                |
  | Enum Members       | PascalCase or UPPER_SNAKE_CASE                                   | `UserRole.Admin`, `ErrorType.AUTH_ERROR` |
  | Classes            | PascalCase                                                       | `UserService`, `NotFoundError`           |
  | Constants          | camelCase or UPPER_SNAKE_CASE                                    | `maxRetries`, `MAX_RETRIES`              |
  | Boolean variables  | Prefer `is`/`has`/`can`/`should` prefix (not enforced by linter) | `isActive`, `hasPermission`              |

  Exceptions (not enforced): destructured properties, object/type literal properties, quoted properties, imports, `_`-prefixed unused vars.

  Config source: `shared/eslint-naming.cjs`

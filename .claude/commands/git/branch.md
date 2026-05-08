---
description: Suggest branch name from staged changes and requirements
argument-hint: [requirement]
allowed-tools:
  [
    "Bash(git branch:*)",
    "Bash(git checkout:*)",
    "Bash(git status:*)",
    "Bash(git diff:*)",
  ]
---

# Git Branch

Suggest a branch name from staged changes or a requirement argument.

## Process

1. Run `git status` and `git diff --cached --stat`.
2. Infer intent from staged files or the argument.
3. Output one branch name.

## Types

| Type         | Pattern                    | Example                 |
| ------------ | -------------------------- | ----------------------- |
| Feature      | `feature/description`      | `feature/user-auth`     |
| Bugfix       | `bugfix/description`       | `bugfix/nav-overflow`   |
| Hotfix       | `hotfix/description`       | `hotfix/security-patch` |
| Experimental | `experimental/description` | `experimental/new-api`  |
| Release      | `release/version`          | `release/1.2.0`         |

With ticket: `feature/JIRA-123_description` (underscore separates ticket from description).

## Rules

- Lowercase, hyphen-separated.
- Branch from `main` only.

## Output

```
**Recommended Branch Name**: `feature/user-authentication`
```

If not on `main`, append:

```
⚠️ Switch to main first:
git checkout main && git pull origin main
git checkout -b feature/user-authentication
```

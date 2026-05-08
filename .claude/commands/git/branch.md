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

Analyzes staged changes and requirements to suggest branch names.

## Process

1. **Check staged changes first** - Run `git status` and `git diff --cached --stat`
2. **Analyze requirement** - From argument or staged file patterns
3. **Output branch name** - Single clean recommendation

## Branch Types

| Type         | Pattern                    | Example                 |
| ------------ | -------------------------- | ----------------------- |
| Feature      | `feature/description`      | `feature/user-auth`     |
| Bugfix       | `bugfix/description`       | `bugfix/nav-overflow`   |
| Hotfix       | `hotfix/description`       | `hotfix/security-patch` |
| Experimental | `experimental/description` | `experimental/new-api`  |
| Release      | `release/version`          | `release/1.2.0`         |

With ticket: `feature/JIRA-123_description`

## Rules

- Lowercase with hyphens
- Create from `main` branch only
- Underscore separates ticket from description

## Output

```
**Recommended Branch Name**: `feature/user-authentication`
```

If not on main:

```
**Recommended Branch Name**: `feature/user-authentication`

⚠️ Switch to main first:
git checkout main && git pull origin main
git checkout -b feature/user-authentication
```

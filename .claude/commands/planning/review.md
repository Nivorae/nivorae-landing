---
description: Staff engineer review of an implementation plan
argument-hint: [path] [--strict]
allowed-tools: Read, Glob, Bash(git:*)
---

# Review Plan

Staff engineer review of an implementation plan before coding begins.

## Instructions

You are a **staff engineer** reviewing an implementation plan. Be thorough but constructive.

### 1. Locate the Plan

- If path provided: read that file
- If no path: look for `PLAN.md` in project root, then `.claude/plans/` for the most recent plan

### 2. Review Checklist

Evaluate the plan against each category. Mark each as PASS, WARN, or FAIL.

#### Requirements Clarity

- [ ] All acceptance criteria are specific and testable
- [ ] Edge cases are explicitly listed
- [ ] "Happy path" and error flows are both defined
- [ ] No ambiguous language ("should", "might", "could consider")

#### Architecture & Design

- [ ] Follows existing feature-based architecture (`src/features/[domain]/`)
- [ ] New services include URL whitelist definitions
- [ ] Data flow is clear (component -> hook -> service -> API)
- [ ] No unnecessary abstractions or over-engineering

#### Security (from `.claude/OWASP_RULES.md`)

- [ ] API paths have whitelist entries planned
- [ ] Auth/permissions model is defined for new endpoints
- [ ] Input validation strategy specified (Zod schemas)
- [ ] Error handling approach won't leak internals

#### Performance

- [ ] No N+1 query patterns in data fetching
- [ ] Pagination planned for list endpoints
- [ ] No blocking operations on the main thread
- [ ] Bundle size impact considered for new dependencies

#### Testability

- [ ] Test strategy defined (unit, integration, e2e)
- [ ] Key behaviors identified for test coverage
- [ ] Mock boundaries are clear

#### Dependencies & Risk

- [ ] External dependencies are justified
- [ ] Migration/rollback strategy exists if applicable
- [ ] No circular dependencies introduced
- [ ] Changes are backwards-compatible or migration path is defined

### 3. Identify Gaps

List anything the plan does NOT address that it should:

- Missing error scenarios
- Unhandled state transitions
- Implicit assumptions that should be explicit

### 4. Suggest Improvements

For each issue found, provide a concrete suggestion, not just a complaint.

**Do not recommend creating a PR.** Focus exclusively on plan quality — the next step after this review is implementation, not a pull request.

## Output Format

```
# Plan Review: [plan name]

## Status: APPROVED | NEEDS-WORK | BLOCKED

### Requirements Clarity
- PASS | WARN | FAIL: [detail]

### Architecture & Design
- PASS | WARN | FAIL: [detail]

### Security
- PASS | WARN | FAIL: [detail]

### Performance
- PASS | WARN | FAIL: [detail]

### Testability
- PASS | WARN | FAIL: [detail]

### Dependencies & Risk
- PASS | WARN | FAIL: [detail]

## Gaps Found
1. [gap description + suggestion]

## Recommendations
1. [actionable improvement]

## Verdict
[1-2 sentence summary of overall assessment]
```

## Decision Logic

| --strict | Failures | Warnings | Result     |
| -------- | -------- | -------- | ---------- |
| Off      | 0        | 0        | APPROVED   |
| Off      | 0        | 1+       | APPROVED   |
| Off      | 1+       | any      | NEEDS-WORK |
| On       | 0        | 0        | APPROVED   |
| On       | 0        | 1+       | NEEDS-WORK |
| On       | 1+       | any      | BLOCKED    |

#!/usr/bin/env bash
# final-verifier.sh — lightweight Stop hook replacement (no LLM tokens)
# Runs lint/type-check/tests and checks security patterns on modified files.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR"

# ── 1. Get modified files ────────────────────────────────────────────────────
MODIFIED=$(git diff --name-only HEAD~1 2>/dev/null || git diff --cached --name-only 2>/dev/null || true)

if [[ -z "$MODIFIED" ]]; then
  echo "✅ APPROVED: No modified files detected." >&2
  exit 0
fi

ERRORS=()
WARNINGS=()

# ── 2. Tooling checks ────────────────────────────────────────────────────────
if command -v pnpm &>/dev/null; then
  if ! pnpm lint >/dev/null 2>&1; then
    ERRORS+=("lint failed — run 'pnpm lint' for details")
  fi

  if ! pnpm type-check >/dev/null 2>&1; then
    ERRORS+=("type-check failed — run 'pnpm type-check' for details")
  fi

  if ! pnpm test --run >/dev/null 2>&1; then
    ERRORS+=("tests failed — run 'pnpm test' for details")
  fi
else
  WARNINGS+=("pnpm not available — tooling checks skipped")
fi

# ── 3. Security pattern checks ───────────────────────────────────────────────
while IFS= read -r file; do
  # Only check existing .ts/.tsx files (skip tests, skip deleted)
  [[ "$file" =~ \.(ts|tsx)$ ]] || continue
  [[ "$file" =~ \.(test|spec)\. ]] && continue
  [[ ! -f "$PROJECT_DIR/$file" ]] && continue

  content=$(cat "$PROJECT_DIR/$file")

  # API calls without whitelist check
  if echo "$content" | grep -qE 'apiClient\.(get|post|put|delete)\(' && \
     ! echo "$content" | grep -qE 'isPathAllowed\('; then
    WARNINGS+=("$file: API call without isPathAllowed()")
  fi

  # Password comparison without constantTimeCompare
  if echo "$content" | grep -qE 'password\s*===' && \
     ! echo "$content" | grep -qE 'constantTimeCompare\('; then
    WARNINGS+=("$file: password comparison without constantTimeCompare()")
  fi

  # Raw throw in catch without formatApiError
  if echo "$content" | grep -qE 'catch\s*\(' && \
     echo "$content" | grep -qE 'throw\s+error' && \
     ! echo "$content" | grep -qE 'formatApiError\('; then
    WARNINGS+=("$file: raw throw in catch without formatApiError()")
  fi

  # Service files missing whitelist definition
  if [[ "$file" =~ services/[^/]+\.ts$ ]] && \
     ! echo "$content" | grep -qiE '(WHITELIST|whitelist)\s*='; then
    WARNINGS+=("$file: service file missing WHITELIST definition")
  fi
done <<< "$MODIFIED"

# ── 4. Report ────────────────────────────────────────────────────────────────
if [[ ${#ERRORS[@]} -gt 0 ]]; then
  echo "🚫 BLOCKED:" >&2
  for e in "${ERRORS[@]}"; do echo "  - $e" >&2; done
  exit 2
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo "⚠️  WARN:" >&2
  for w in "${WARNINGS[@]}"; do echo "  - $w" >&2; done
  exit 0
fi

echo "✅ APPROVED: tooling passed, no pattern issues." >&2
exit 0

#!/bin/bash
# error-logger.sh - PostToolUse hook: detect failures in Bash output, append to ERRORS.md
# Non-blocking (always exits 0) — observation only

set -e

# Read JSON input from stdin
INPUT=$(cat)

# Extract tool name — only process Bash tool
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

# Extract command and tool result
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
TOOL_RESULT=$(echo "$INPUT" | jq -r '.tool_result // empty')

if [ -z "$COMMAND" ] || [ -z "$TOOL_RESULT" ]; then
  exit 0
fi

# Failure detection patterns
FAILURE_DETECTED=false
CATEGORY=""

# Jest/Vitest test failures
if echo "$TOOL_RESULT" | grep -qiE '(FAIL |FAILED|Tests:\s+\d+ failed)'; then
  FAILURE_DETECTED=true
  CATEGORY="test-failure"
fi

# npm errors
if [ "$FAILURE_DETECTED" = false ] && echo "$TOOL_RESULT" | grep -qF 'npm ERR!'; then
  FAILURE_DETECTED=true
  CATEGORY="npm-error"
fi

# TypeScript compilation errors
if [ "$FAILURE_DETECTED" = false ] && echo "$TOOL_RESULT" | grep -qE 'error TS[0-9]+'; then
  FAILURE_DETECTED=true
  CATEGORY="typescript-error"
fi

# Runtime errors
if [ "$FAILURE_DETECTED" = false ] && echo "$TOOL_RESULT" | grep -qE '(TypeError:|ReferenceError:|SyntaxError:|RangeError:)'; then
  FAILURE_DETECTED=true
  CATEGORY="runtime-error"
fi

# Build failures
if [ "$FAILURE_DETECTED" = false ] && echo "$TOOL_RESULT" | grep -qiE '(Build failed|build error|esbuild.*error)'; then
  FAILURE_DETECTED=true
  CATEGORY="build-error"
fi

# Lint failures
if [ "$FAILURE_DETECTED" = false ] && echo "$TOOL_RESULT" | grep -qiE '(lint.*error|eslint.*error|\d+ error)'; then
  FAILURE_DETECTED=true
  CATEGORY="lint-error"
fi

if [ "$FAILURE_DETECTED" = false ]; then
  exit 0
fi

# Extract first meaningful error line (skip blank lines, take first match)
FIRST_ERROR=$(echo "$TOOL_RESULT" | grep -iE '(FAIL |ERROR|error TS|TypeError:|ReferenceError:|SyntaxError:|Build failed|npm ERR!)' | head -1 | cut -c1-200)

if [ -z "$FIRST_ERROR" ]; then
  FIRST_ERROR="(error details in tool output)"
fi

# Get project root
PROJECT_ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
ERRORS_FILE="$PROJECT_ROOT/ERRORS.md"

# Ensure ERRORS.md exists
if [ ! -f "$ERRORS_FILE" ]; then
  exit 0
fi

# Get current date
DATE=$(date +%Y-%m-%d)

# Truncate command for readability
SHORT_COMMAND=$(echo "$COMMAND" | head -1 | cut -c1-150)

# Append entry to ERRORS.md (after "## Recent Errors" line)
ENTRY="\n### [$CATEGORY] $DATE\n- **Command**: \`$SHORT_COMMAND\`\n- **Error**: $FIRST_ERROR\n"

# Use sed to insert after the "## Recent Errors" section marker
# macOS sed requires different syntax, so use a temp file approach
TEMP_FILE=$(mktemp)
awk -v entry="$ENTRY" '
  /^## Recent Errors/ {
    print
    getline  # skip the blank description line
    print
    printf "%s\n", entry
    next
  }
  { print }
' "$ERRORS_FILE" > "$TEMP_FILE" && mv "$TEMP_FILE" "$ERRORS_FILE"

# Always exit 0 — this hook is non-blocking
exit 0

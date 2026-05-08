#!/usr/bin/env bash
# Claude Code auto-fix script
# Requires: ANTHROPIC_API_KEY environment variable

set -e

# Check if Claude CLI is available
if ! command -v claude &> /dev/null; then
  echo "⚠️  Claude CLI not installed. Run: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

# Check for API key
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "⚠️  ANTHROPIC_API_KEY not set. Skipping Claude auto-fix."
  echo "   Set it in your shell: export ANTHROPIC_API_KEY=sk-ant-..."
  exit 1
fi

echo "🤖 Running Claude auto-fix..."

claude -p "Fix all ESLint and TypeScript errors in the staged files. Run 'npm run lint' to see errors, then fix them. Do NOT commit - just fix the files." \
  --allowedTools "Read" "Edit" "Bash(npm run lint)" "Bash(npm run type-check)" "Glob" "Grep"

echo ""
echo "✅ Claude auto-fix complete. Please review changes and re-commit."
echo "   Run 'git diff' to see what was fixed."

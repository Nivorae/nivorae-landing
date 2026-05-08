# Full-Stack Template Kit

Production-ready React + Express + Prisma monorepo with OWASP Top 10 security patterns.

## Prerequisites

| Requirement | Version |
| ----------- | ------- |
| Node.js     | 18+     |
| pnpm        | 9+      |
| Docker      | 24+     |

## Quick Start

```bash
pnpm install
docker compose up -d
cp backend/.env.example backend/.env   # set DATABASE_URL
pnpm --filter backend prisma migrate dev
pnpm dev
```

## Workspace

- `frontend/` — React + Vite + TS SPA
- `backend/` — Express + Prisma + TS API
- `shared/` — shared types and Zod schemas

## Environment

Frontend (`frontend/.env.local`):

```bash
VITE_API_URL=http://localhost:3001
VITE_USE_MOCK_DATA=true
```

Backend (`backend/.env`):

```bash
PORT=3001
DATABASE_URL=postgresql://dev:dev@localhost:5439/myapp
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Scripts

```bash
pnpm dev | pnpm dev:fe | pnpm dev:be
pnpm build | pnpm lint | pnpm type-check | pnpm test | pnpm format
pnpm db:migrate | pnpm db:studio | pnpm db:seed
pnpm agent "prompt" | pnpm agent:setup | pnpm agent:review
```

## Git 工作流程 (zh-TW)

分支策略：`feature/*` → `develop` → `main`。PR 一律以 `develop` 為 base。

### `/git:branch` — 從變更內容建議分支名稱

依據已暫存 (staged) 的變更與需求，產生符合慣例的分支名稱（如 `feature/login-form`）。

```bash
# 在 Claude Code 中
/git:branch
```

使用時機：開始新功能前，已 `git add` 變更但尚未建立分支。

### `/git:commit` — 以 Conventional Commits 格式提交

自動分析 staged diff，產生符合專案規範的 commit message（imperative、<72 字元、無 scope、無 Claude 簽名）。

```bash
git add <files>
# 在 Claude Code 中
/git:commit
```

範例輸出：`feat: add landing hero section`、`fix: resolve webhook race condition`。

### `/git:changelog` — 從 commit 歷史產生 CHANGELOG 並升版

從上一個 tag 起讀取 commit，更新 `CHANGELOG.md`、同步升級 `package.json` 的 `version`，並可選擇建立 git tag。

```bash
# 在 Claude Code 中
/git:changelog
```

完成後會：

1. 在 `CHANGELOG.md` 最上方新增該版本區塊
2. 將 `package.json` 的 `version` 改為新版本號
3. 提示是否建立對應的 git tag

### 發版與打 tag (Landing Page 版本追蹤)

版本號以 `package.json` 的 `version` 欄位為準，`CHANGELOG.md` 必須與其同步。發版流程：

```bash
# 1. 用 /git:changelog 同步版本號與 CHANGELOG，並提交
git add package.json CHANGELOG.md
git commit -m "chore: release v0.1.0"

# 2. 打 tag 並推送（版本號 = package.json 的 version，前綴 v）
git tag v0.1.0
git push --tags
```

每次 landing page 上線前都需執行此流程，確保 git tag、`package.json`、`CHANGELOG.md` 三者一致。

## 樣式與字型 (zh-TW)

- `frontend/src/styles/globals.css` — Tailwind 三層 (`base`/`components`/`utilities`)、CSS reset、亮/暗色 color tokens、基礎元素樣式。全站主題調整都改這裡。
- `frontend/src/styles/fonts.css` — `@font-face` 宣告檔。
- 自架字型檔 (`.woff` / `.woff2`) 放在 `frontend/public/fonts/`，於 `fonts.css` 以 `url('/fonts/<檔名>.woff2')` 引用，並加上 `font-display: swap` 以避免 FOIT。

## Security

OWASP Top 10 patterns:

| Pattern             | Location                                            |
| ------------------- | --------------------------------------------------- |
| URL Whitelist       | `frontend/src/core/security/urlWhitelist.ts`        |
| Timing-Safe Compare | `frontend/src/core/security/constantTimeCompare.ts` |
| Error Sanitization  | `frontend/src/core/api/errors.ts`                   |
| Protected Routes    | `frontend/src/core/auth/ProtectedRoute.tsx`         |
| Auth Middleware     | `backend/src/middleware/auth.ts`                    |
| Input Validation    | `backend/src/middleware/validate.ts`                |

## Documentation

| Document                               | When to Use                 |
| -------------------------------------- | --------------------------- |
| [`SETUP.md`](SETUP.md)                 | Project setup questionnaire |
| [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) | Design tokens, styling      |
| [`.agent/README.md`](.agent/README.md) | Claude Agent SDK usage      |
| [`CHANGELOG.md`](CHANGELOG.md)         | Version history             |

## Troubleshooting

```bash
lsof -ti:5173 | xargs kill -9                # Frontend port in use
lsof -ti:3001 | xargs kill -9                # Backend port in use
docker compose down && docker compose up -d  # Restart Postgres
pnpm --filter backend prisma migrate reset   # Reset database
```

# QAFlow

Responsive quality management dashboard built with Next.js 16, TypeScript, React 19, and Recharts.

> Educational prototype. All names and metrics are fictional sample data.

## Features
- Executive dashboard at `/` with KPI cards, quality trend, program comparison, recent evaluations and CSV export.
- Agent scorecards at `/agents`.
- Searchable and filterable evaluation log at `/evaluations`.
- Monthly reports at `/reports`, including print-to-PDF.
- Internal JSON API at `/api/dashboard` using a Next.js Route Handler.
- Server and Client Components, React state/effect hooks, responsive navigation, loading and error UI.

## Requirements
Node.js 20.9+ (Node 22 recommended) and npm.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Validation
```bash
npm run lint
npm run build
npm start
```

## Environment
The sample application does not require third-party credentials. `.env.example` documents `NEXT_PUBLIC_APP_NAME`. Keep secrets in `.env.local`; never commit that file.

## Architecture
- `app/`: App Router pages, root layout, loading/error boundaries, and API route.
- `components/`: shared responsive sidebar, page heading and interactive dashboard.
- `lib/data.ts`: typed fictional sample data.
- `VIBE_CODING.md`: prompts, iterations, decisions and challenges.

## Deploy to Vercel
Import `https://github.com/gqcoding/qaflow-nextjs` as a new Vercel project, keep the detected Next.js settings, and deploy. No environment secret is required for the demo. Add the final production URL here after deployment.

## Git history
Development commits should represent actual implementation/review stages. This repository starts with the initial project commit; do not invent earlier dates or claim unperformed checks.
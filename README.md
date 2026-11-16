# QAFlow — Quality Management Platform

A responsive QA management dashboard built with **Next.js 16, App Router, TypeScript, React 19, and Recharts**. The educational demo includes executive metrics, agent scorecards, evaluation search/filtering, reports, and a server-side JSON API.

> **Demo notice:** All names, scores, and evaluations are fictional sample data. Do not use this prototype for real employee records without authentication, authorization, privacy controls, and a persistent database.

## Features
- **Overview — `/`**: KPI cards, weekly QA trend, program scorecard, recent evaluations, CSV export.
- **Agents — `/agents`**: agent scorecards, program, evaluation volume, QA score, and trend.
- **Evaluations — `/evaluations`**: searchable evaluation log with result filters and empty state.
- **Reports — `/reports`**: monthly summary, target attainment, coaching flags, print-to-PDF.
- **Internal API — `/api/dashboard`**: Next.js Route Handler serving dashboard metrics and chart/table data.
- Responsive navigation, Client and Server Components, React hooks, loading and error UI.

## Requirements
- Node.js 20.9 or newer (Node 22 recommended)
- npm

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Quality checks
```bash
npm run lint
npm run build
npm start
```
Verify the four pages and request `/api/dashboard` to confirm the JSON endpoint responds.

## Environment variables
The sample app does not need an external API key. `.env.example` documents the optional public app-name setting. Keep real credentials in `.env.local`; never commit that file. Any future secrets should be read only by server-side code.

## Architecture
- `app/api/dashboard/route.ts`: internal GET endpoint.
- `app/agents/page.tsx`: agent scorecards.
- `app/evaluations/page.tsx`: Client Component with search/filter.
- `app/reports/page.tsx`: reporting and print.
- `app/page.tsx`: overview dashboard.
- `components/`: reusable navigation, page header, dashboard client.
- `lib/data.ts`: typed fictional sample data.
- `VIBE_CODING.md`: AI prompts and process log.

Server Components render the root shell and agent scorecard. Client Components handle filters, navigation, chart interactions, export, and browser APIs. The dashboard uses `useState` and `useEffect` to fetch the internal API; evaluations use `useState` and `useMemo`.

## Deploy to Vercel
1. Import [gqcoding/qaflow-nextjs](https://github.com/gqcoding/qaflow-nextjs) in Vercel.
2. Keep the detected Next.js framework and root directory settings.
3. No external secret is required for the sample demo.
4. Deploy and replace this line with your production URL: **Deployment URL: pending**.

## Git history
The repository history records actual publishing steps through descriptive commits. The original project generation stages are documented in `VIBE_CODING.md`; no historical commits are fabricated.

See [VIBE_CODING.md](./VIBE_CODING.md) for the project prompts, iterations, architecture decisions, challenges, and validation checklist.

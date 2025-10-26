# RegiFlow – Client

React 19 + Vite SPA that powers both the Supplier and REG Admin portals. The client mirrors the implementation plan located in `client/README_PLAN.md` and talks to the API described in the backend workspace (with mocked fallbacks for local-only development).

## Stack

- React 19 with React Router v7 layouts
- TypeScript + Vite + Vitest
- TailwindCSS + custom UI primitives
- React Query for server cache + Zustand for auth state
- React Hook Form + Zod for schema-backed forms

## Getting started

```bash
cd client
npm install
npm run dev      # start Vite on http://localhost:5173
npm run test     # run Vitest + Testing Library
npm run build    # type-check and build production bundle
```

Set `VITE_API_BASE` in a `.env` file to point the HTTP layer at a live backend. When the API is unreachable, the client falls back to rich mock data so the flows remain navigable offline.

## Project structure

```
src/
 ├─ app/
 │   ├─ components/      # shared UI primitives & layout shell
 │   ├─ features/        # auth, supplier, admin experiences
 │   ├─ hooks/           # toast + auth helpers
 │   ├─ providers/       # QueryClient + global providers
 │   └─ routes/          # router + guards + landing page
 ├─ lib/api/             # fetch wrapper + feature-specific API helpers
 ├─ lib/mock/            # deterministic mock fixtures
 ├─ types/               # shared domain types
 └─ tests/               # Vitest setup + smoke tests
```

## Key flows

- **Supplier portal** – dashboard with status chips, draft form builder with validation, record detail timeline, and rejected-record duplication workflow.
- **Admin portal** – KPIs, verification queue with approve/reject actions, export/download center, import dry-run preview, and searchable audit log.
- **Shared experiences** – role-based routing, toast notifications, responsive layouts, and optimistic React Query mutations tied to the plan.

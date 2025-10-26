## RegiFlow

Supplier and REG team workflow platform with an Express/MongoDB backend and an upcoming Angular frontend. This repo currently contains a functional backend MVP plus planning docs for the client app.

---

### Repo Structure

| Path      | Description                                      |
| --------- | ------------------------------------------------ |
| `backend` | Express API (auth, suppliers, staff records, exports) |
| `client`  | Angular plan/notes (implementation pending)      |

---

### Backend (Node.js + Express)

- **Stack**: Node 22, Express 5, Mongoose, JWT, helmet/cors/morgan, Jest + Supertest.
- **Features**: Admin/supplier auth, supplier CRUD, staff record lifecycle (draft → submit → verify → export), CSV preview export jobs, health check.

#### Prerequisites

- Node.js 22+
- MongoDB instance (local or Atlas)

#### Setup & Run

```bash
cd backend
cp .env.example .env          # edit values as needed
npm install
npm run dev                   # starts nodemon on port 4000 by default
```

Useful scripts:

- `npm start` – production mode (no nodemon).
- `npm test` – Jest + Supertest smoke tests (no DB required for health check).

> The server seeds a default admin user using `DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD` the first time it connects to Mongo. Change those credentials immediately after login.

---

### Frontend (Angular 19 plan)

The `client/README_PLAN.md` documents the intended Angular + Material + Tailwind frontend (supplier and admin portals, role-based routing, NgRx/Signals). Implementation will begin after backend MVP validation.

---

### Next Steps

1. Finish backend QA: add Mongo-backed integration tests and CI (GitHub Actions).
2. Kick off Angular client build following the documented plan.
3. Introduce Docker/Compose once both services need a common dev environment.

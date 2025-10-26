
## **backend/README_PLAN.md**

### **Project Overview**

Backend for **RegiFlow** — a supplier and REG team management system built with **Node.js**, **Express 5**, and **MongoDB**.
Responsible for authentication, supplier + staff CRUD, workflow automation (submission → verification → export), and lightweight audit/export logging.

---

### **MVP Scope (Sprint 0–1)**

1. **Auth** — email/password login, JWT access tokens, seeded admin.
2. **Suppliers** — admin CRUD to onboard suppliers and toggle status.
3. **Staff Records** — supplier CRUD + submit; admin verify; status history in document.
4. **Exports** — admin endpoint that marks verified records as exported and returns CSV preview (no files yet).
5. **Health/Monitoring** — health endpoint, console logging, `.env` driven config.

_Out of scope for MVP_: file uploads, imports, refresh tokens, elaborate audit UI, Docker images.

---

### **Tech Stack**

* **Runtime:** Node.js 22
* **Web:** Express 5 + Helmet, CORS, Morgan
* **Database:** MongoDB Atlas/local via Mongoose ODM
* **Auth:** JWT (access token only), bcrypt password hashing
* **Validation:** express-validator
* **Logging:** Morgan (request) + console (app)
* **Env Config:** dotenv + `.env.example`
* **Testing:** Jest + Supertest (API smoke)
* **Tooling:** Nodemon for dev, GitHub Actions (lint/test) later

---

### **Modules**

1. **Auth**

   * Seed admin on boot
   * Register supplier/admin (admin protected)
   * Login + `/me` profile
   * Roles: `supplier`, `admin`

2. **Suppliers**

   * CRUD (admin only)
   * Links users to supplier via `supplierId`

3. **Users**

   * Stored with password hash, role, supplier link
   * Last login timestamp

4. **StaffRecords**

   * Create/Edit/Delete (for suppliers)
   * Submit (lock editing)
   * Verify (by admin)
   * Statuses:

     * 00 Draft
     * 01 Submitted
     * 02 Verified
     * 03 Exported
     * (Approved/Rejected reserved for post-MVP imports)

5. **Files**

   * _Deferred_: uploads + filename validation (placeholder fields stored on record)

6. **Exports (MVP)**

   * POST `/exports/run` transitions Verified → Exported
   * Responds with CSV preview (first 20 rows)
   * `ExportJob` collection logs batch metadata

7. **Imports**

   * _Deferred_: Excel upload + Approved/Rejected transitions

8. **Audit**

   * Basic audit stored inline on `StaffRecord` timestamps
   * Full audit endpoints deferred

---

### **Data Model Summary**

| Collection     | Purpose                                      |
| -------------- | -------------------------------------------- |
| `users`        | Auth info, salted password, role, supplier   |
| `suppliers`    | Supplier profile + active flag               |
| `staffRecords` | Employee data + status + timestamps          |
| `exportjobs`   | Export batch metadata + record references    |

---

### **API Endpoint Overview**

| Method | Endpoint                     | Role      | Description                         |
| ------ | ---------------------------- | --------- | ----------------------------------- |
| POST   | /api/auth/login              | Public    | Login with email/password           |
| POST   | /api/auth/register           | Admin     | Create supplier/admin user          |
| GET    | /api/auth/me                 | Auth      | Return current profile              |
| GET    | /api/suppliers               | Admin     | List suppliers                      |
| POST   | /api/suppliers               | Admin     | Create supplier                     |
| PUT    | /api/suppliers/:id           | Admin     | Update supplier                     |
| GET    | /api/staff-records           | Auth      | List records (scoped by role)       |
| POST   | /api/staff-records           | Supplier  | Create draft record                 |
| PUT    | /api/staff-records/:id       | Supplier  | Update draft record                 |
| POST   | /api/staff-records/:id/submit| Supplier  | Submit draft (lock editing)         |
| POST   | /api/staff-records/:id/verify| Admin     | Verify submitted record             |
| POST   | /api/exports/run             | Admin     | Export verified records → exported  |
| GET    | /api/exports/jobs            | Admin     | Recent export batches               |

---

### **Workflow**

1. Supplier creates record → status 00
2. Supplier submits → status 01 (locked)
3. Admin verifies → status 02
4. Admin exports → status 03
5. Future: Admin imports results → 04 Approved or 05 Rejected

---

### **Implementation Phases**

**Phase 0 — Scaffolding**

* Express app, Mongo connection, health route, env config
* Seed default admin from `.env`

**Phase 1 — Core Features**

* Auth routes (register/login/me) + JWT middleware
* Supplier CRUD (admin guard)
* Staff record CRUD + submit/verify flows + validation

**Phase 2 — Enhancements**

* Export job endpoint + CSV preview + status log
* Basic Jest + Supertest smoke tests
* CI workflow + observability TODOs
* Prep for future imports/files (placeholder fields)

---

### **Folder Structure**

```
src/
 ├─ app.js
 ├─ server.js
 ├─ config/
 │   └─ db.js
 ├─ controllers/
 ├─ middleware/
 ├─ models/
 ├─ routes/
 ├─ utils/
 └─ __tests__/
```

---

### **Setup Checklist**

1. Copy `.env.example` → `.env` and set Mongo URI + secrets.
2. `npm install` then `npm run dev` (nodemon) or `npm start`.
3. Hit `/health` to verify server.
4. Login with seeded admin or create via `/api/auth/register` (admin role).

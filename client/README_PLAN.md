## **client/README_PLAN.md**

### **Project Overview**

Frontend for **RegiFlow** — built with **React 19** + **Vite + TailwindCSS**.
Provides separate experiences for **Suppliers** and **REG Admins** for data entry, verification, and tracking with a shared component library.

---

### **Tech Stack**

* **Framework:** React 19 + Vite (SPA with code-split routes)
* **UI + Styling:** TailwindCSS + Headless UI/Custom primitives
* **State Management:** React Query (server cache) + Zustand (client state)
* **Routing:** React Router v7 with protected layouts per role
* **Forms & Validation:** React Hook Form + Zod schemas
* **HTTP:** Fetch wrappers with JWT-aware interceptors
* **Build/Tooling:** Vite + Vitest + Testing Library
* **Deployment:** Static bundle via NGINX or Express

---

### **Page Structure**~

#### **Supplier Portal**

1. **Login/Register**

   * JWT-based login
   * Supplier context loaded post-login

2. **Dashboard**

   * List of staff records
   * Status chips: Draft, Submitted, Verified, Exported, Approved, Rejected
   * Button: “Add New Record”

3. **Record Form**

   * Reactive form with validation
   * Photo upload + preview
   * Auto filename check
   * Save (Draft) or Submit (lock record)

4. **Record Detail**

   * Read-only view after submission
   * Status timeline and audit history

5. **Rejected Record**

   * Show rejection reason
   * “Duplicate to Edit” → creates new Draft copy

---

#### **REG Admin Portal**

1. **Login**

   * Admin authentication

2. **Dashboard**

   * Cards showing counts by status
   * Filter by supplier/date

3. **Verification Queue**

   * List all Submitted (01) records
   * Record detail → Verify button

4. **Export Center**

   * Export all Verified (02)
   * Download Excel + log entry

5. **Import Center**

   * Upload Excel
   * Dry-run validation + summary
   * Apply → updates statuses

6. **Audit View**

   * Filter logs by date/user/status

---

### **Implementation Phases**

**Phase 1: Foundation + Supplier Portal**

* Bootstrap Vite + Tailwind project structure
* Implement auth shell, supplier dashboard, record form, photo upload
* Integrate React Query + optimistic draft save

**Phase 2: Admin Portal**

* Admin dashboards, verification queue, export/import workflows
* Shared data table + filter components
* Toast system, confirm modals, audit trails

**Phase 3: Hardening & Delivery**

* Role-based routing guards + refresh token handling
* Responsive polish + accessibility sweep
* Vitest/Test Library coverage + Dockerfile build

---

### **Folder Structure**

```
src/
 ├─ app/
 │   ├─ providers/ (query client, auth context)
 │   ├─ hooks/
 │   ├─ components/
 │   │   ├─ ui/
 │   │   └─ shared/
 │   ├─ features/
 │   │   ├─ auth/
 │   │   ├─ supplier/
 │   │   │   ├─ dashboard/
 │   │   │   └─ record-form/
 │   │   ├─ admin/
 │   │   │   ├─ dashboard/
 │   │   │   ├─ verify/
 │   │   │   ├─ export/
 │   │   │   └─ import/
 │   ├─ routes/
 │   │   ├─ supplier.tsx
 │   │   └─ admin.tsx
 │   └─ main.tsx
 ├─ assets/
 ├─ lib/
 │   └─ api/
 └─ tests/
```

---

### **API Integration**

* `VITE_API_BASE = "https://api.regiflow.com"`
* Fetch wrapper attaches JWT + retries refresh
* React Query mutation lifecycle for optimistic updates
* Global error boundary + toast feedback system

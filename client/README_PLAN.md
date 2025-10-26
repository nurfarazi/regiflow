## **client/README_PLAN.md**

### **Project Overview**

Frontend for **RegiFlow** — built with **Angular 19** + **Material + TailwindCSS**.
Provides separate experiences for **Suppliers** and **REG Admins** for data entry, verification, and tracking.

---

### **Tech Stack**

* **Framework:** Angular 19 (Standalone Components, Signals, Typed Forms)
* **UI Library:** Angular Material + TailwindCSS
* **State Management:** NgRx (for admin), Signals (for supplier)
* **Routing:** Angular Router (role-based guards)
* **Validation:** Reactive Forms
* **HTTP:** Angular HttpClient + Interceptors (JWT)
* **Build:** Vite or Angular CLI
* **Deployment:** NGINX / Express static host

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

**Phase 1: Supplier App**

* Auth, Dashboard, Record Form, Photo Upload
* Status badges and submit lock

**Phase 2: Admin App**

* Admin Dashboard, Verify, Export, Import
* Reusable record table component
* Toasts, confirmations

**Phase 3: Polish & CI**

* Responsive layout
* Theme integration
* Role-based routes
* Dockerfile build

---

### **Folder Structure**

```
src/
 ├─ app/
 │   ├─ core/ (services, guards, interceptors)
 │   ├─ shared/ (components, pipes)
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
 │   ├─ app.routes.ts
 │   └─ app.component.ts
 ├─ assets/
 ├─ environments/
 └─ main.ts
```

---

### **API Integration**

* `environment.apiBase = "https://api.regiflow.com"`
* JWT added via `AuthInterceptor`
* Global error handler for 401/403
* Loading spinner and toast feedback system

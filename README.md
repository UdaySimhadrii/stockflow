# StockFlow — MVP Inventory Management

A minimal multi-tenant SaaS inventory app: sign up, manage products, and see a
live low-stock dashboard. Built to the Phase 1 (6-hour) PRD.

## Tech Stack

**Backend:** Node.js, Express, **Sequelize (SQL ORM) + SQLite**, JWT, bcrypt, express-validator
**Frontend:** React, Vite, Tailwind CSS, React Router, Axios

> Note on the database: the PRD's tech-stack section requested MongoDB/Mongoose,
> but a later instruction asked for SQL instead. This project uses **Sequelize**
> (a SQL ORM) with **SQLite** as the storage engine, so it's zero-config and
> runs anywhere with no separate database server to install. Because Sequelize
> is dialect-agnostic, switching to PostgreSQL or MySQL later is a one-line
> change in `backend/src/config/db.js` (plus a connection string) — no model
> or query code needs to change.

## Project Structure

```
stockflow/
  backend/    Express API (Clean Architecture: controllers → services → repositories → models)
  frontend/   React SPA
```

## Getting Started

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API starts on `http://localhost:5000`. On first run it creates
`src/database/stockflow.sqlite` and the tables automatically — no manual
migration step needed for this MVP.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173` and proxies `/api` requests to the
backend automatically (see `vite.config.js`).

### 3. Use it

Open `http://localhost:5173`, sign up with an email, password, and
organization name, and you'll land on the dashboard. Add a product, set its
quantity below its threshold, and it will appear in "Low stock items."

## Design decisions worth knowing about

- **Auth:** JWT stored in `localStorage` on the client for simplicity in this
  MVP. For a production deployment, consider moving to an httpOnly cookie to
  reduce XSS exposure.
- **Multi-tenancy:** every product query is scoped by `organizationId` pulled
  from the verified JWT — never from the client body/query — so one
  organization can never read or modify another's data.
- **Low stock logic:** a product is "low stock" when
  `quantityOnHand <= (product.lowStockThreshold ?? organization.defaultLowStockThreshold)`.
  This lives in `dashboardService.js` and is mirrored client-side in
  `ProductTable.jsx` for the list view's status badge.
- **Deletes are hard deletes** with a confirmation dialog, per the PRD's MVP scope.
- **Out of scope** (per PRD): password reset, multi-user orgs/roles, CSV import,
  email notifications, purchase orders, stock movement history.

## API Overview

| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/auth/signup | No |
| POST | /api/auth/login | No |
| GET | /api/auth/me | Yes |
| GET | /api/products?search=&page=&pageSize= | Yes |
| POST | /api/products | Yes |
| GET / PUT / DELETE | /api/products/:id | Yes |
| GET | /api/dashboard/summary | Yes |
| GET / PUT | /api/settings | Yes |

## Next steps if you continue building

- Add automated tests (unit for services, integration for routes)
- Password reset flow
- CSV import for bulk product creation
- Stock movement history / audit log

# AgriSathi

A farm-management web app for Indian farmers. A farmer creates an account, records their farm, tracks every expense, keeps a daily activity journal, and sees live totals on a dashboard. All data is entered by the user and stored in MongoDB — there is no sample or seeded data.

## Features

| # | Feature | What it does |
|---|---------|--------------|
| 1 | **Register & Login** | Real accounts with hashed passwords (bcrypt) and JWT sessions. Wrong passwords and duplicate emails are rejected; the session survives a page reload. |
| 2 | **Farmer Dashboard** | Live totals from your own records: farms and land area, total and this-month spending, spending by category, recent expenses and activities. New users see a "Get started" checklist. |
| 3 | **My Farm** | Add, edit and delete farms: location, land area and unit, soil type and pH, water source. |
| 4 | **Farm Expenses** | Add, edit, delete and filter expenses by category, with summary cards and a category pie chart. |
| 5 | **Activity Journal** | A dated timeline of farm work (sowing, irrigation, harvest, …) with crop, time spent and notes. |
| 6 | **Profile** | Update name, phone and village/district/state; the sidebar updates instantly. |

Every farmer only ever sees their own data (enforced on the server).

## Tech stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Recharts, lucide-react
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt
**Branches:** `main` / `shubhank` — frontend · `surbhi` — backend API
**Testing / CI:** Vitest, React Testing Library, Jenkins (see `Jenkinsfile`)

## Running locally

Prerequisites: Node.js 20+ and MongoDB running on `localhost:27017`.

**1. Backend** (terminal 1) — the API code lives on the `surbhi` branch
```bash
cd server
npm install
cp .env.example .env    # then set JWT_SECRET to a long random string
npm start               # API on http://localhost:5000
```

**2. Frontend** (terminal 2, project root)
```bash
npm install
npm run dev             # app on http://localhost:5173 (proxies /api to :5000)
```

Open http://localhost:5173, click **Register**, and start adding your own data.

## API

All routes except register/login need an `Authorization: Bearer <token>` header.

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/register` | Create a farmer account |
| POST | `/api/auth/login` | Log in, returns a JWT |
| GET / PUT | `/api/auth/me`, `/api/auth/profile` | Current user / update profile |
| GET | `/api/dashboard` | Dashboard totals |
| GET POST PUT DELETE | `/api/farms` | Farms |
| GET POST PUT DELETE | `/api/expenses` | Expenses |
| GET POST PUT DELETE | `/api/activities` | Journal entries |

## Tests & CI

```bash
npm test          # run all tests
npm run test:ci   # tests + coverage + JUnit report (used by Jenkins)
```

The Jenkins pipeline (`Jenkinsfile`) runs on every push: checkout, install, automated tests, build, then archives the build. Test results, coverage and a summary line are published on each build, and an email can be sent on failure or recovery.

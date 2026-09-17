# AgriSathi

A farmer-assistance web platform that brings crop recommendations, weather alerts, mandi (market) prices, disease detection, and expert consultation together in one app for Indian farmers, plus an admin panel to manage the platform.

## Current status

The **frontend is fully built and functional** — all pages render correctly with no console errors, the full test suite passes, and the production build is optimized. The frontend currently runs on local mock data (`src/data/mockData.js`); it is not yet wired up to the backend API.

The **backend** (Express + MongoDB) exists with models, routes, and controllers for all major features, and has been verified to boot and connect to MongoDB, but the frontend does not call it yet.

## Tech stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Recharts, lucide-react
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, Multer
**Testing:** Vitest, React Testing Library

## Features built so far

**Public pages**
- Landing page, Login (with Farmer/Admin role selection), Register

**Farmer dashboard** (`/farmer/*`)
- Dashboard, My Farm, Crop Recommendation, Disease Detection, Weather, Mandi Prices, Fertilizer Recommendation, Government Schemes, Crop Calendar, Farm Expenses, Farm Journal, Expert Consultation, Notifications, Profile Settings

**Admin dashboard** (`/admin/*`)
- Dashboard, Manage Farmers, Manage Experts, Manage Schemes, Manage Crops, Manage Reports

**Backend API** (`server/`)
- Auth, Farms, Crops, Expenses, Activities, Schemes, Mandi prices, Experts, Notifications, Dashboard, Disease scans, Admin routes

## What's been fixed/improved

- Fixed a broken `index.html` that was missing the app's mount point and script tag (the app would not render at all)
- Rebuilt the Login and Register pages, which referenced CSS files that didn't exist and were inconsistent with the rest of the app's design
- Fixed the Vite/Vitest config so the test suite runs correctly
- Route-based code-splitting: the main JS bundle dropped from ~788KB to ~213KB, with each page now loading as its own chunk
- Added a favicon and fixed the browser tab title
- Hardened `.gitignore` to keep build output, logs, and secrets (`.env`) out of version control

## Getting started

### Frontend
```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm test          # run the test suite
```

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your MongoDB URI and JWT secret
npm run dev             # start dev server at http://localhost:5000
```

## Roadmap

- [ ] Accessibility pass (labels, alt text, focus states, contrast)
- [ ] Mobile/responsive polish across farmer and admin pages
- [ ] Expand test coverage beyond auth/landing pages
- [ ] Connect frontend to the real backend API (replacing mock data)
- [ ] Lint/format setup and code cleanup

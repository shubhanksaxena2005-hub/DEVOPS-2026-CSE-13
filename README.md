# AgriSathi — Backend API

Express + MongoDB REST API for AgriSathi. The React frontend is on the `shubhank` branch, and the complete project is on `main`.

## Run locally

Prerequisites: Node.js 20+ and MongoDB on `localhost:27017`.

```bash
cd server
npm install
cp .env.example .env    # set JWT_SECRET to a long random string
npm start               # http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

## Endpoints

All routes except register/login need `Authorization: Bearer <token>`.

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/register` | Create a farmer account |
| POST | `/api/auth/login` | Log in, returns a JWT |
| GET / PUT | `/api/auth/me`, `/api/auth/profile` | Current user / update profile |
| GET | `/api/dashboard` | Dashboard totals for the logged-in farmer |
| GET POST PUT DELETE | `/api/farms` | Farms |
| GET POST PUT DELETE | `/api/expenses` | Expenses |
| GET POST PUT DELETE | `/api/activities` | Activity journal |

Passwords are hashed with bcrypt, and every farmer can only read or change their own records.

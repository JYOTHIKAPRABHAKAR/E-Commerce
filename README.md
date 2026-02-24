**E‑Commerce (React + Vite) — Project README

A simple MERN-style learning/e-commerce demo application built with:

- Frontend: React + Vite (+ React Router, Axios, Bootstrap)
- Backend: Express (simple API serving quiz data and user auth with MongoDB + Mongoose)
- Axios for HTTP requests

This README documents project structure, local setup, API endpoints, and deployment notes (including Vercel).

**Features**
- User registration and login (JWT stored in `localStorage`).
- Protected routes for authenticated pages (`/index`, `/course/:id`, `/quiz`).
- Course listing fetched from Open Library API via backend proxy.
- Quiz functionality served from a local JSON file.

**Tech stack**
- React 19 + Vite
- React Router
- Bootstrap for styles
- Express + Mongoose (backend)

**Project structure (key files)**
- `package.json` — root project scripts/dependencies.
- `src/` — React source:
  - `src/main.jsx` — app entry, mounts `App` with `BrowserRouter`.
  - `src/App.jsx` — route definitions and top-level layout.
  - `src/navigation.jsx` — header/navigation (shows links based on auth token).
  - `src/login.jsx`, `src/register.jsx` — auth forms that call backend endpoints.
  - `src/index.jsx` — course listing page (requests `/index` backend route).
  - `src/course.jsx` — course details page.
  - `src/quiz.jsx` — quiz UI that fetches `/quiz` from backend.
  - `src/ProtectedRoute.jsx` — client-side route guard (checks `localStorage` token).
- `Backend/` — simple Express backend:
  - `Backend/app.js` — Express server with routes: `/register`, `/login`, `/index`, `/quiz`.
  - `Backend/quiz.json` — quiz data.
  - `Backend/models/users.js` — Mongoose user schema.

**Backend API Endpoints**
- `POST /register` — create user. Expects JSON `{ name, email, password }`.
- `POST /login` — authenticate. Expects `{ email, password }`. Returns `{ token }` on success.
- `GET /index` — proxy to Open Library subject endpoint; returns course/works JSON.
- `GET /quiz` — returns quiz JSON from `Backend/quiz.json`.

Note: The backend currently uses `mongoose.connect('mongodb://127.0.0.1:27017/user')` and signs JWTs with the literal string `'secretkey'`. For production, use environment variables and a managed database.

**Local setup (development)**
1. Install dependencies (project root):

```bash
npm install
```

2. Start the backend (open a terminal in `Backend/`):

```bash
cd Backend
npm install
npm run start    # runs node app.js (or use nodemon for dev)
```

The backend listens on port `3005` by default.

3. Start the frontend (project root):

```bash
npm run dev
```

4. Open `http://localhost:5173` (Vite default) and use the app. Register a user, then login to access protected pages.

**Build for production (frontend)**

```bash
npm run build
```

The static build output is written to `dist/`.

**Environment variables and security**
- Replace hard-coded values in `Backend/app.js`:
  - MongoDB URI (use `process.env.MONGODB_URI`).
  - JWT secret (use `process.env.JWT_SECRET`).
- Do not commit production credentials.

**Deployment notes (Vercel)**
Two common approaches:

1) Frontend on Vercel, backend hosted externally (recommended for quick migration):
  - Deploy the `dist/` static site on Vercel (import repo, set build command `npm run build`, output `dist`).
  - Host backend on a server/host (Render, Railway, Heroku, or VPS). Set the public API URL in the frontend (use an env var like `VITE_API_BASE_URL`) and update axios requests accordingly.

2) Entire app on Vercel (convert backend to serverless functions):
  - Move backend routes into `api/` functions (e.g., `api/register.js`, `api/login.js`, `api/quiz.js`).
  - Remove `app.listen()` from `Backend/app.js` and export handlers instead.
  - Note: serverless functions are ephemeral — use an external DB for persistence.

Quick Vercel CLI deploy (frontend-only):

```bash
npm i -g vercel
vercel       # follow prompts
vercel --prod
```

**Troubleshooting**
- If React fails to fetch the backend, ensure `Backend` is running on `http://localhost:3005` and CORS is enabled (it's enabled in `app.js`).
- If MongoDB connection fails, start a local MongoDB or update `MONGODB_URI`.

**Next steps / Suggestions**
- Move secrets to environment variables.
- Add password hashing (bcrypt) before storing passwords.
- Add proper error handling and validation on backend routes.
- Add tests and CI (GitHub Actions) for build verification.

---

If you want, I can:
- Convert `Backend` routes into Vercel serverless functions,
- Or update the frontend to use an environment variable for the API base URL (`VITE_API_BASE_URL`) and wire it into axios calls.

Updated file: README_UPDATED.md

# Task Manager with Role-Based Access (MERN)

A complete MERN stack application featuring authentication (JWT), role-based authorization (user/admin), and a task management module with pagination and search.

## Project Structure

```
backend/
  controllers/
  routes/
  models/
  middleware/
  config/
  server.js
frontend/
  src/
    components/
    pages/
    api/
    App.js
    main.jsx
  vite.config.js
README.md
```

## Features

- JWT-based auth (register/login)
- Roles: `user` and `admin`
- Task CRUD with owner/admin permissions
- Pagination (`?page=&limit=`) and search (`?search=`)
- Clean React UI (Vite), Axios, protected routes

## Requirements

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

## Environment Variables

Create `.env` files for backend and frontend based on the samples.

- Backend: `backend/.env`
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_manager_db
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:5173
```

- Frontend: `frontend/.env`
```
VITE_API_URL=http://localhost:5000
```

## Setup & Run Locally

1. Install dependencies
```
cd backend && npm install
cd ../frontend && npm install
```

2. Backend (development)
```
cd backend
npm run dev
```
Server runs at `http://localhost:5000`.

3. Frontend (development)
```
cd frontend
npm run dev
```
App runs at `http://localhost:5173`.

## API Endpoints

Base URL: `http://localhost:5000`

- Auth
  - POST `/api/register` — Register new user
  - POST `/api/login` — Login and receive JWT

- Tasks (JWT required in `Authorization: Bearer <token>`)
  - POST `/api/tasks` — Create task (user/admin)
  - GET `/api/tasks` — Get tasks
    - User: own tasks
    - Admin: all tasks
    - Query: `?page=1&limit=10&search=mytitle`
  - GET `/api/tasks/:id` — Get single task (owner or admin)
  - PUT `/api/tasks/:id` — Update task (owner or admin)
  - DELETE `/api/tasks/:id` — Delete task (owner or admin)

## Sample Requests

- Register
```
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"hunter2","role":"user"}'
```

- Login
```
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"hunter2"}'
```

- Create Task
```
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Details","status":"pending"}'
```

- Get Tasks (with search and pagination)
```
curl -X GET "http://localhost:5000/api/tasks?page=1&limit=10&search=my" \
  -H "Authorization: Bearer <TOKEN>"
```

- Update Task
```
curl -X PUT http://localhost:5000/api/tasks/<TASK_ID> \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

- Delete Task
```
curl -X DELETE http://localhost:5000/api/tasks/<TASK_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

## Frontend Usage

- Register or login.
- JWT is saved to `localStorage`.
- Dashboard loads tasks depending on role.
- Create/Edit/Delete tasks from the UI.
- Logout clears token and user info.

## Git Push Instructions

1. Initialize Git and make first commit
```
git init
git add .
git commit -m "Initial MERN Task Manager"
```
2. Create a new GitHub repository (via UI or CLI), then add remote and push
```
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## Deployment

Recommended approach:
- Deploy backend to a Node-friendly host (Render, Railway, Fly.io, or a VPS)
- Deploy frontend to Vercel

### Backend (Render as example)
- Create a new Web Service
- Set Build Command: `npm install`
- Set Start Command: `npm start`
- Set Environment Variables: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN`
- After deployment, note the backend URL (e.g., `https://your-backend.onrender.com`)

### Frontend (Vercel)
- Import the GitHub repo into Vercel
- Project: `frontend` folder
- Environment Variable `VITE_API_URL` → your backend URL
- Deploy; Vercel gives you a production URL.

If you prefer to deploy backend on Vercel, you’ll need to adapt Express to Vercel serverless functions using `@vercel/node` runtime and an `api/` directory. The current backend is designed for a persistent Node server, so Render/Railway is simpler.

## Notes

- Validation uses JOI on both auth and tasks.
- CORS is enabled; update `CORS_ORIGIN` for production.
- MongoDB Atlas is recommended for production.
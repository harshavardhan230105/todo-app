# Todo App

A full-stack todo application with a multi-page React frontend and a Node.js/Express backend backed by file-based JSON storage.

## Project structure

```
todo-app/
├── backend/          Express REST API, persists data to backend/data/todos.json
├── frontend/         Multi-page React app (Vite + React Router)
└── docs/
    ├── FEATURES.md   Full list of features and how to use them
    └── API.md        REST API reference
```

## Prerequisites

- Node.js 18+ and npm

## Running the backend

```bash
cd backend
npm install
npm start
```

The API starts on `http://localhost:4000`. Data is persisted to `backend/data/todos.json` (created empty by default).

## Running the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173`. The dev server proxies `/api/*` requests to the backend on port 4000 (see `frontend/vite.config.js`), so make sure the backend is running first.

## Pages

- `/` — Todo list page (`frontend/src/pages/TodoListPage.jsx`)
- `/todo?id=<id>` — Todo detail page for a single todo, identified by the `id` query parameter (`frontend/src/pages/TodoDetailPage.jsx`)

These are distinct routes rendered by React Router, each backed by its own page component (not a single-page modal/overlay), satisfying the multi-page requirement.

## Documentation

- [docs/FEATURES.md](docs/FEATURES.md) — feature and functionality reference
- [docs/API.md](docs/API.md) — backend API reference

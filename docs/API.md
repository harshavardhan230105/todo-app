# API Reference

Base URL: `http://localhost:4000/api/todos`

All request/response bodies are JSON.

## Todo object

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "priority": "medium",
  "category": "general",
  "dueDate": "2026-07-01",
  "createdAt": "2026-06-27T10:00:00.000Z",
  "updatedAt": "2026-06-27T10:00:00.000Z"
}
```

## Endpoints

### `GET /api/todos`

List todos. Supports optional query parameters:

| Param        | Description                                              |
|--------------|-----------------------------------------------------------|
| `completed`  | `true` or `false` — filter by completion status           |
| `priority`   | `low`, `medium`, or `high`                                 |
| `category`   | exact match, case-insensitive                              |
| `search`     | matches substring in `title` or `description`              |
| `sort`       | `dueDate`, `priority`, or `createdAt` (newest first)        |

Response: `200 OK` with an array of todo objects.

### `GET /api/todos/:id`

Fetch a single todo by id.

- `200 OK` with the todo object.
- `404 Not Found` — `{ "error": "Todo not found" }`

### `POST /api/todos`

Create a todo.

Request body:

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "category": "general",
  "dueDate": "2026-07-01"
}
```

Only `title` is required; all other fields are optional and fall back to defaults (`completed: false`, `priority: "medium"`, `category: "general"`, `dueDate: null`).

- `201 Created` with the created todo object (includes generated `id`, `createdAt`, `updatedAt`).
- `400 Bad Request` — `{ "errors": ["..."] }` on validation failure.

### `PUT /api/todos/:id`

Update a todo. Accepts a partial body — only the supplied fields are changed.

```json
{ "completed": true }
```

- `200 OK` with the updated todo object.
- `400 Bad Request` — `{ "errors": ["..."] }` on validation failure.
- `404 Not Found` — `{ "error": "Todo not found" }`

### `DELETE /api/todos/:id`

Delete a todo.

- `204 No Content` on success.
- `404 Not Found` — `{ "error": "Todo not found" }`

### `GET /health`

Liveness check, returns `{ "status": "ok" }`.

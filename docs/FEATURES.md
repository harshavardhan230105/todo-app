# Features

## Data model

Each todo has the following fields:

| Field         | Type             | Notes                                              |
|---------------|------------------|-----------------------------------------------------|
| `id`          | number           | Auto-incremented, assigned by the backend          |
| `title`       | string           | Required                                            |
| `description` | string           | Optional free text                                  |
| `completed`   | boolean          | Defaults to `false` on creation                    |
| `priority`    | `low`/`medium`/`high` | Defaults to `medium`                          |
| `category`    | string           | Free-form tag/category, defaults to `general`       |
| `dueDate`     | ISO date string or `null` | Optional                                  |
| `createdAt`   | ISO timestamp    | Set on creation, immutable                          |
| `updatedAt`   | ISO timestamp    | Updated on every edit                               |

## Pages

### Todo List page (`/`)

- **Add a todo** — form at the top to create a todo with title, description, priority, category, and due date. Title is required.
- **Toggle complete/active** — checkbox on each todo item flips its completed state.
- **Delete a todo** — delete button on each item, with a confirmation prompt.
- **Filter by status** — All / Active / Completed buttons.
- **Filter by priority** — dropdown to show only Low/Medium/High priority todos.
- **Search** — free-text search box that matches against title and description.
- **Sort** — sort the list by due date, priority, or newest-first (creation date).
- **Remaining count** — footer shows how many active (incomplete) todos remain.
- **Link to detail page** — clicking a todo's title navigates to its detail page.
- **Visual priority indicator** — each todo row is color-coded by priority (red/amber/green left border).

### Todo Detail page (`/todo?id=<id>`)

- Reads the todo `id` from the `id` query parameter in the URL.
- Fetches and displays the full todo record: title, description, status, priority, category, due date, and the `createdAt` / `updatedAt` timestamps.
- **Edit in place** — every field is editable in a form; "Save changes" persists updates via the API.
- **Delete** — delete the todo from this page and return to the list.
- **Back to list** link.
- Shows a friendly error message if the `id` is missing or does not correspond to an existing todo.

## Backend behavior

- All todo data is persisted to a JSON file (`backend/data/todos.json`), so it survives server restarts.
- Reads/writes to the file are serialized through an in-memory queue to avoid race conditions on concurrent requests.
- Input validation runs on create/update: `title` must be a non-empty string, `priority` must be one of `low`/`medium`/`high`, `completed` must be boolean, `dueDate` must be a valid date or `null`.
- List endpoint supports filtering by completion status, priority, and category, plus free-text search and sorting — see [API.md](API.md) for the full reference.

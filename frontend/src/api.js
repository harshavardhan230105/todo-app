const BASE_URL = "/api/todos";

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.errors?.join(", ") || data?.error || "Request failed";
    throw new Error(message);
  }
  return data;
}

export function fetchTodos(filters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== "")
  );
  const query = params.toString();
  return fetch(`${BASE_URL}${query ? `?${query}` : ""}`).then(handleResponse);
}

export function fetchTodo(id) {
  return fetch(`${BASE_URL}/${id}`).then(handleResponse);
}

export function createTodo(todo) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  }).then(handleResponse);
}

export function updateTodo(id, todo) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  }).then(handleResponse);
}

export function deleteTodo(id) {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then(handleResponse);
}

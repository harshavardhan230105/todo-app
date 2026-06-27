const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data", "todos.json");

// Serializes reads/writes so concurrent requests never interleave file access.
let queue = Promise.resolve();
function withFileLock(task) {
  const result = queue.then(task);
  queue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

async function readAll() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw || "[]");
}

async function writeAll(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
}

function nextId(todos) {
  const maxId = todos.reduce((max, t) => Math.max(max, t.id), 0);
  return maxId + 1;
}

async function getAll() {
  return withFileLock(() => readAll());
}

async function getById(id) {
  const todos = await withFileLock(() => readAll());
  return todos.find((t) => t.id === id) || null;
}

async function create(data) {
  return withFileLock(async () => {
    const todos = await readAll();
    const now = new Date().toISOString();
    const todo = {
      id: nextId(todos),
      title: data.title,
      description: data.description || "",
      completed: false,
      priority: data.priority || "medium",
      category: data.category || "general",
      dueDate: data.dueDate || null,
      createdAt: now,
      updatedAt: now,
    };
    todos.push(todo);
    await writeAll(todos);
    return todo;
  });
}

async function update(id, data) {
  return withFileLock(async () => {
    const todos = await readAll();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const existing = todos[index];
    const updated = {
      ...existing,
      ...data,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    todos[index] = updated;
    await writeAll(todos);
    return updated;
  });
}

async function remove(id) {
  return withFileLock(async () => {
    const todos = await readAll();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    await writeAll(todos);
    return true;
  });
}

module.exports = { getAll, getById, create, update, remove };

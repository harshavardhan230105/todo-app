import { useEffect, useState, useCallback } from "react";
import TodoForm from "../components/TodoForm.jsx";
import TodoItem from "../components/TodoItem.jsx";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api.js";

export default function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all"); // all | active | completed
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const filters = { sort };
      if (status !== "all") filters.completed = status === "completed";
      if (priority) filters.priority = priority;
      if (search) filters.search = search;
      const data = await fetchTodos(filters);
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [status, priority, search, sort]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(todo) {
    await createTodo(todo);
    load();
  }

  async function handleToggle(todo) {
    await updateTodo(todo.id, { completed: !todo.completed });
    load();
  }

  async function handleDelete(todo) {
    if (!window.confirm(`Delete "${todo.title}"?`)) return;
    await deleteTodo(todo.id);
    load();
  }

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <main className="page todo-list-page">
      <h1>My Todos</h1>

      <TodoForm onSubmit={handleAdd} />

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-group">
          {["all", "active", "completed"].map((s) => (
            <button
              key={s}
              className={status === s ? "active" : ""}
              onClick={() => setStatus(s)}
            >
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort: default</option>
          <option value="dueDate">Sort: due date</option>
          <option value="priority">Sort: priority</option>
          <option value="createdAt">Sort: newest first</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p className="empty">No todos found.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <p className="todo-count">{activeCount} item(s) left</p>
    </main>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { fetchTodo, updateTodo, deleteTodo } from "../api.js";

export default function TodoDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const [todo, setTodo] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("No todo id provided in the URL (expected ?id=<id>).");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchTodo(id)
      .then((data) => {
        setTodo(data);
        setForm(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const updated = await updateTodo(id, {
        title: form.title,
        description: form.description,
        priority: form.priority,
        category: form.category,
        dueDate: form.dueDate || null,
        completed: form.completed,
      });
      setTodo(updated);
      setForm(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${todo.title}"?`)) return;
    await deleteTodo(id);
    navigate("/");
  }

  if (loading) return <main className="page">Loading...</main>;
  if (error) {
    return (
      <main className="page">
        <p className="error">{error}</p>
        <Link to="/">Back to list</Link>
      </main>
    );
  }
  if (!todo) return null;

  return (
    <main className="page todo-detail-page">
      <Link to="/" className="back-link">
        &larr; Back to list
      </Link>
      <h1>Todo #{todo.id}</h1>

      <form onSubmit={handleSave} className="todo-detail-form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>

        <label>
          Status
          <select
            name="completed"
            value={form.completed ? "true" : "false"}
            onChange={(e) => setForm((p) => ({ ...p, completed: e.target.value === "true" }))}
          >
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} />
        </label>

        <label>
          Due date
          <input
            type="date"
            name="dueDate"
            value={form.dueDate || ""}
            onChange={handleChange}
          />
        </label>

        <div className="meta">
          <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
          <p>Last updated: {new Date(todo.updatedAt).toLocaleString()}</p>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </main>
  );
}

const express = require("express");
const store = require("../store");

const router = express.Router();
const PRIORITIES = ["low", "medium", "high"];

function validateTodoInput(body, { partial = false } = {}) {
  const errors = [];

  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      errors.push("title is required and must be a non-empty string");
    }
  }
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) {
    errors.push(`priority must be one of: ${PRIORITIES.join(", ")}`);
  }
  if (body.completed !== undefined && typeof body.completed !== "boolean") {
    errors.push("completed must be a boolean");
  }
  if (body.dueDate !== undefined && body.dueDate !== null && Number.isNaN(Date.parse(body.dueDate))) {
    errors.push("dueDate must be a valid date string or null");
  }
  return errors;
}

// GET /api/todos?completed=true&priority=high&category=work&search=text&sort=dueDate
router.get("/", async (req, res, next) => {
  try {
    let todos = await store.getAll();
    const { completed, priority, category, search, sort } = req.query;

    if (completed !== undefined) {
      const wantCompleted = completed === "true";
      todos = todos.filter((t) => t.completed === wantCompleted);
    }
    if (priority) {
      todos = todos.filter((t) => t.priority === priority);
    }
    if (category) {
      todos = todos.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const needle = search.toLowerCase();
      todos = todos.filter(
        (t) =>
          t.title.toLowerCase().includes(needle) ||
          t.description.toLowerCase().includes(needle)
      );
    }

    if (sort === "dueDate") {
      todos = [...todos].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sort === "priority") {
      const order = { high: 0, medium: 1, low: 2 };
      todos = [...todos].sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sort === "createdAt") {
      todos = [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const todo = await store.getById(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const errors = validateTodoInput(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const todo = await store.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const errors = validateTodoInput(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ errors });

    const updated = await store.update(id, req.body);
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const removed = await store.remove(id);
    if (!removed) return res.status(404).json({ error: "Todo not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

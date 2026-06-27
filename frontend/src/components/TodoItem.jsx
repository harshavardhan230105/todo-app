import { Link } from "react-router-dom";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item priority-${todo.priority} ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "active" : "completed"}`}
      />
      <Link to={`/todo?id=${todo.id}`} className="todo-title">
        {todo.title}
      </Link>
      <span className="todo-category">{todo.category}</span>
      {todo.dueDate && <span className="todo-due">Due {todo.dueDate}</span>}
      <button className="delete-btn" onClick={() => onDelete(todo)}>
        Delete
      </button>
    </li>
  );
}

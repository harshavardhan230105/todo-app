import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage.jsx";
import TodoDetailPage from "./pages/TodoDetailPage.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todo" element={<TodoDetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

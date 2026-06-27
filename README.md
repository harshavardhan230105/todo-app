# Todo Application

A full-stack Todo Application built using **React**, **Node.js**, and **Express.js**. The application allows users to manage their todos with complete CRUD functionality. It is implemented as a **multi-page React application** (not a Single Page Application) and uses a Node.js backend with Express.js to store and manage todo data.

---

## Features

### Frontend

- Multi-page React application
- Todo List page displaying all todos
- Single Todo Details page
- Todo Details page receives the Todo ID through a query parameter
- Create new todos
- Edit existing todos
- Delete todos
- Mark todos as completed/incomplete
- Responsive and user-friendly interface

### Backend

- RESTful CRUD APIs using Express.js
- Create Todo
- Read All Todos
- Read Single Todo
- Update Todo
- Delete Todo
- Data stored using JSON file (or Database, if applicable)
- Proper error handling and validation

---

## Technologies Used

### Frontend

- React
- React Router
- Axios
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js

### Data Storage

- JSON File

---

## Project Structure

```
todo-application/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /todos | Get all todos |
| GET | /todos/:id | Get a single todo |
| POST | /todos | Create a new todo |
| PUT | /todos/:id | Update an existing todo |
| DELETE | /todos/:id | Delete a todo |

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/your-repository-name.git
```

---

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## Running the Application

### Start Backend

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

### Start Frontend

```bash
npm run dev
```

or

```bash
npm start
```

depending on your React setup.

Frontend runs on:

```
http://localhost:3000
```

or

```
http://localhost:5173
```

---

## Screenshots

### Todo List Page

![Todo List](screenshots/todo-list.png)

### Todo Details Page

![Todo Details](screenshots/todo-details.png)

---

## Functionalities

- View all todos
- View individual todo details
- Add new todo
- Update todo information
- Delete todo
- Mark todo status
- Navigation between pages
- Backend integration through REST APIs

---

## Future Improvements

- User Authentication
- Search Todos
- Filter by Status
- Due Date Support
- Priority Levels
- Pagination
- Dark Mode
- Database Integration (MongoDB/MySQL)

---

## Repository

GitHub Repository:

https://github.com/yourusername/your-repository-name

---

## Author

**Harsha Vardhan B R**

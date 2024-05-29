import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (text, deadline) => {
    const newTodo = { id: Date.now(), text, completed: false, deadline };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="App">
      <img
        src={`${process.env.PUBLIC_URL}/todo-liste-logo.png`}
        alt="Todo List Logo"
        className="app-logo"
      />
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <Filters currentFilter={filter} setFilter={handleFilterChange} />
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

function TodoInput({ addTodo }) {
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() && deadline) {
      addTodo(input, deadline);
      setInput("");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList({ todos, deleteTodo, toggleComplete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text} (Deadline: {todo.deadline})
          </span>
          <div>
            <button onClick={() => toggleComplete(todo.id)}>Complete</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Filters({ currentFilter, setFilter }) {
  return (
    <div>
      <button
        onClick={() => setFilter("all")}
        disabled={currentFilter === "all"}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        disabled={currentFilter === "active"}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        disabled={currentFilter === "completed"}
      >
        Completed
      </button>
    </div>
  );
}

export default App;

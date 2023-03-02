import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/Todoform';
// import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:9292/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoCreate = async (title, description, category) => {
    try {
      const response = await fetch('http://localhost:9292/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, category })
      });

      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCompleted = async (id, completed) => {
    const updatedTodo = { completed: !completed };
    await fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    fetchTodos();
  };

  const handleTodoDelete = async (id) => {
    try {
      await fetch(`http://localhost:9292/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm onCreate={handleTodoCreate} />
      <table >
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.category}</td>
              <td>
              <button onClick={() => handleToggleCompleted(todo.id, todo.completed)}>
                {todo.completed ? 'Yes' : 'No'}
              </button></td>
              <td>
                <button onClick={() => handleTodoDelete(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

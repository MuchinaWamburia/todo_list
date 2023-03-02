import React, { useState, useEffect } from 'react';
import './style/App.css'
import TodoForm from './components/Todoform';


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

  const handleTodoCreate = e =>
  {
    e.preventDefault();
    const data ={title: 'title', description: 'description', category: 'category'}
    console.log(data)

    fetch ("http://localhost:9292/todos",{
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
        body: JSON.stringify(data),
        })
      .then((r) => r.json())
      .then((response) => 
      {
        console.log(response) 
        
      });
  

    //   setTitle("");  setUser(""); setContent("");
    };
     

  const handleTodoUpdate = async (id, todo) => {
    try {
      const response = await fetch(`http://localhost:9292/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
  
      const data = await response.json();
      setTodos(todos.map((t) => (t.id === id ? data : t)));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleTodoToggleCompleted = async (id, todo) => {
    try {
      const response = await fetch(`http://localhost:9292/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: todo.completed })
      });
  
      const data = await response.json();
      setTodos(todos.map((t) => (t.id === id ? data : t)));
    } catch (error) {
      console.error(error);
    }
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
              <button onClick={() => handleTodoToggleCompleted(todo.id, todo.completed)}>
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

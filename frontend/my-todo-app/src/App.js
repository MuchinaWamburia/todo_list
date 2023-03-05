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

  function handleTodoCreate(title, description, category) {
    const data = {
      title: title,
      description: description,
      category: category
    };
  
    fetch(`http://localhost:9292/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setTodos([...todos, data]);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  fetch(`http://localhost:9292/todos/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Buy Milk and Eggs',
      description: 'Go to the grocery store and buy milk and eggs',
      category: 'Groceries',
      completed: false
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Todo updated successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem updating the todo:', error);
    });

  
  
  
  // const handleTodoToggleCompleted = async (id, todo) => {
  //   try {
  //     const response = await fetch(`http://localhost:9292/todos/${id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ completed: todo.completed })
  //     });
  
  //     const data = await response.json();
  //     setTodos(todos.map((t) => (t.id === id ? data : t)));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleTodoToggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
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
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {todos.map((todo) => {
  console.log(todo.category);
  return (
    <tr key={todo.id}>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{todo.category}</td>
      <td>
        <button onClick={() => handleTodoToggleCompleted(todo.id)}>
          {todo.completed ? 'Yes' : 'No'}
        </button>
      </td>
      <td>
        <button onClick={() => handleTodoDelete(todo.id)}>
          Delete
        </button>
      </td>
    </tr>
  );})}
        </tbody>
      </table>
    </div>
  );
}

export default App;

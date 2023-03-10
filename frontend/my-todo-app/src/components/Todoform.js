import React, { useState } from 'react';

function TodoForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onCreate(title, description, category);
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;

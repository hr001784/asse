import React, { useState, useEffect } from 'react';

export default function TaskForm({ initial = null, onSubmit }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'pending');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDescription(initial.description || '');
      setStatus(initial.status || 'pending');
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{initial ? 'Edit Task' : 'Create Task'}</h3>
      <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="row">
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn" type="submit">{initial ? 'Save' : 'Create'}</button>
      </div>
    </form>
  );
}
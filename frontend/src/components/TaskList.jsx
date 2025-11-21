import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <div className="card">No tasks found.</div>;
  }

  return (
    <div className="list">
      {tasks.map((task) => (
        <div key={task._id} className="card">
          <div className="header">
            <h3 style={{ margin: 0 }}>{task.title}</h3>
            {/* status badge with color */}
            <span className={`status status--${String(task.status).toLowerCase()}`}>{task.status}</span>
          </div>
          {task.description && <p style={{ marginTop: 8 }}>{task.description}</p>}
          <div className="meta" style={{ marginTop: 8 }}>
            <span>
              Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : '—'}
            </span>
            {task.createdBy && (
              <span style={{ marginLeft: 12 }}>
                by <strong>{typeof task.createdBy === 'object' ? task.createdBy.username : task.createdBy}</strong>
              </span>
            )}
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn secondary" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn danger" onClick={() => onDelete(task)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
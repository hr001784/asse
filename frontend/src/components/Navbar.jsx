import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/dashboard"><strong>Task Manager</strong></Link>
      </div>
      <div>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && (
          <>
            <span style={{ marginRight: 12 }}>Hello, {user.username} ({user.role})</span>
            <Link to="/tasks/new" className="btn">New Task</Link>
            <button className="btn secondary" style={{ marginLeft: 8 }} onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
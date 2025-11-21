import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import TaskList from '../components/TaskList.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async (pageArg = page, searchArg = search) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/api/tasks?page=${pageArg}&limit=10&search=${encodeURIComponent(searchArg)}`);
      setTasks(data.tasks || []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdit = (task) => navigate(`/tasks/${task._id}/edit`);
  const onDelete = async (task) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/api/tasks/${task._id}`);
      fetchTasks(page, search);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Dashboard</h2>
        <p style={{ marginTop: 0 }}>
          {user?.role === 'admin' ? 'Admin view: all tasks' : 'User view: your tasks only'}
        </p>
      </div>

      <SearchBar onSearch={(q) => { setSearch(q); fetchTasks(1, q); }} />

      {loading && <div className="card">Loading...</div>}
      {error && <div className="card" style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={(p) => fetchTasks(p, search)} />
    </div>
  );
}
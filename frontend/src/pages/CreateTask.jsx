import React from 'react';
import TaskForm from '../components/TaskForm.jsx';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateTask() {
  const navigate = useNavigate();

  const submit = async (payload) => {
    try {
      await api.post('/api/tasks', payload);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed');
    }
  };

  return (
    <TaskForm onSubmit={submit} />
  );
}
import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm.jsx';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/api/tasks/${id}`);
        setTask(data);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to load task');
        navigate('/dashboard');
      }
    };
    load();
  }, [id, navigate]);

  const submit = async (payload) => {
    try {
      await api.put(`/api/tasks/${id}`, payload);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <TaskForm initial={task} onSubmit={submit} />
  );
}
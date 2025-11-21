import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const submit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <form onSubmit={submit} className="card" style={{ display: 'flex', gap: 8 }}>
      <input className="input" placeholder="Search by title" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}
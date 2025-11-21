import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination card">
      <button className="btn secondary" onClick={() => onPageChange(Math.max(page - 1, 1))} disabled={page <= 1}>Prev</button>
      <span>Page {page} of {totalPages || 1}</span>
      <button className="btn secondary" onClick={() => onPageChange(Math.min(page + 1, totalPages))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
import React from 'react';

function Nav({ setPage, handleLogout }) {
  return (
    <nav>
      <button onClick={() => setPage('dashboard')}>Dashboard</button>
      <button onClick={() => setPage('products')}>Product Management</button>
      <button onClick={() => setPage('users')}>User Management</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Nav;

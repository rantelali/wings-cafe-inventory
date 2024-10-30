import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import StockManagement from './components/StockManagement';
import './App.css';

function App() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || []);
  const [loggedInUser, setLoggedInUser] = useState(() => JSON.parse(localStorage.getItem('loggedInUser')) || null);

  const handleLogin = (username, password, setMessage) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setMessage('');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  const handleSignup = (username, password, setMessage) => {
    if (users.find(u => u.username === username)) {
      setMessage('Username already exists.');
    } else {
      setUsers([...users, { username, password }]);
      localStorage.setItem('users', JSON.stringify([...users, { username, password }]));
      setMessage('Signup successful. You can now log in.');
    }
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('products', JSON.stringify(products));
  }, [users, products]);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <Router>
      <div>
        {loggedInUser ? (
          <>
            <nav>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/product-management">Product Management</Link>
              <Link to="/user-management">User Management</Link>
              <Link to="/stock-management">Stock Management</Link> {/* New Link */}
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <Routes>
              <Route path="/dashboard" element={<Dashboard products={products} />} />
              <Route path="/product-management" element={<ProductManagement products={products} setProducts={setProducts} />} />
              <Route path="/user-management" element={<UserManagement users={users} setUsers={setUsers} />} />
              <Route path="/stock-management" element={<StockManagement products={products} />} /> {/* New Route */}
              <Route path="/" element={<AuthPage onLogin={handleLogin} onSignup={handleSignup} />} />
            </Routes>
          </>
        ) : (
          <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </div>
    </Router>
  );
}

export default App;

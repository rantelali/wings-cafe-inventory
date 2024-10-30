import React, { useState } from 'react';

const UserManagement = ({ users, setUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddOrEditUser = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('All fields are required.');
      return;
    }

    const newUser = {
      username,
      password,
    };

    if (isEditing) {
      const updatedUsers = users.map(user =>
        user.username === currentUser.username ? newUser : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setMessage('User updated successfully.');
    } else {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setMessage('User added successfully.');
    }

    // Clear the form fields
    setUsername('');
    setPassword('');
    setIsEditing(false);
    setCurrentUser(null);
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    if (isEditing && currentUser?.username === username) {
      // Reset form if editing the deleted user
      setIsEditing(false);
      setCurrentUser(null);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleAddOrEditUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleDelete(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        th {
          background-color: #007BFF;
          color: white;
        }

        tr:hover {
          background-color: #f1f1f1;
        }

        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;

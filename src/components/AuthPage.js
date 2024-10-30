import React, { useState } from 'react';

const AuthPage = ({ onLogin, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    onLogin(username, password, setMessage);
  };

  const handleSignup = () => {
    onSignup(username, password, setMessage);
  };

  const styles = {
    authContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'transparent', // Set to transparent or your desired color
    },
    header: {
      fontSize: '36px',
      marginBottom: '20px',
      backgroundColor: 'transparent', // Ensure it's transparent
    },
    subHeader: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    authForm: {
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#fff', // Optional: add a background to the form for contrast
    },
    input: {
      width: 'calc(100% - 20px)',
      marginBottom: '15px',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '18px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '12px',
      width: '48%',
      borderRadius: '6px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    message: {
      marginTop: '20px',
      color: '#ffcc00',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.authContainer}>
      <h1 style={styles.header}>WINGS CAFE INVENTORY SYSTEM</h1>

      <form style={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleLogin}
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleSignup}
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            Signup
          </button>
        </div>
      </form>
      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
};

export default AuthPage;

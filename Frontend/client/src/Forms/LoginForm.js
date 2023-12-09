// Import necessary modules
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://miniproject9-backend.onrender.com/auth/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json', // Adjust based on your server's requirements
          // Other headers if needed
        },
      });
  
      if (response.status === 200) {
        const userId = response.data.userId;
  
        // Include the user ID in subsequent requests to the backend
        axios.defaults.headers.common['Authorization'] = `Bearer ${userId}`;
  
        navigate('/all-forms');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Error during login');
      console.error(error);
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-form" style={{ border: '2px double #CD853F', padding: '20px', borderRadius: '10px', width: '300px', backgroundColor: 'olive' }}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" style={{ width: '100%', backgroundColor: '#8B4513', color: '#C4A484', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </form>

        {/* Add a link to the register form */}
        <p>
          Don't have an account?{' '}
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

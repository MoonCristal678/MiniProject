import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const responseData = await response.json();

      if (response.ok) {
       
        onRegister();
      } else {
       
        if (responseData.message.includes('Username is already taken')) {
          setErrorMessage('Username is already taken. Please choose a different one.');
        } else {
         
          setErrorMessage('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Username is already taken. Please choose a different one.');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', border: '5px solid olive', borderRadius: '10px' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '300px', backgroundColor: 'olive' }}>
        <h1>Register</h1>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form>
          <div>
            <label htmlFor="username" style={{ fontWeight: 'bold' }}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>

        <p>
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

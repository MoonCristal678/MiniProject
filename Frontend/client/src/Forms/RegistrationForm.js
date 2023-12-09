import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://miniproject9-backend.onrender.com/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess('Registration successful. You can now login.');
        setError('');

        // Redirect to the login page after a successful registration
        navigate('/');
      } else {
        setError(`Registration failed. Server response: ${response.statusText}`);
        setSuccess('');
      }
    } catch (error) {
      setError(`Error during registration: ${error.message}`);
      setSuccess('');
      console.error(error);
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-form" style={{ border: '2px double #CD853F', padding: '20px', borderRadius: '10px', width: '300px', backgroundColor: 'olive' }}>
        <h2 style={{ textAlign: 'center', color: '#004526' }}>Register</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
        <form onSubmit={handleRegister}>
          <label style={{ color: '#1B4D3E' }}>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label style={{ color: '#1B4D3E' }}>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label style={{ color: '#1B4D3E' }}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit" style={{ width: '100%', backgroundColor: '#8B4513', color: '#C4A484', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

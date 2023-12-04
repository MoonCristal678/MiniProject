import React, { useState } from 'react';
import { loginUser } from '../api';
import RegistrationForm from './RegistrationForm';

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToRegister, setRedirectToRegister] = useState(false);

  const redirectToRegisterPage = () => {
    setRedirectToRegister(true);
  };

  const handleInputChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
  };

  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    try {
      const response = await loginUser(loginData);

      if (response.ok) {
        // Call the parent component's login callback
        onLogin();
      } else {
        // Handle login failure and set error message
        const responseBody = await response.json();
        setErrorMessage(responseBody.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const renderLoginForm = () => (
    <div className="app-section">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={loginData.username}
          onChange={(e) => {
            handleInputChange('username', e.target.value);
            setErrorMessage('');
          }}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={loginData.password}
          onChange={(e) => {
            handleInputChange('password', e.target.value);
            setErrorMessage('');
          }}
          required
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <button type="button" onClick={redirectToRegisterPage}>
          Register
        </button>

        {/* Display error message */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );

  if (redirectToRegister) {
    return <RegistrationForm onRegister={() => setRedirectToRegister(false)} />;
  }

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', border: '5px solid olive', borderRadius: '10px' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '300px', backgroundColor: 'olive' }}>
        <h1>Login</h1>
        {renderLoginForm()}
      </div>
    </div>
  );
};

export default LoginForm;

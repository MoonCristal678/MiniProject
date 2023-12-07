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
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessage('');
  };
  
  const handleLogin = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }), // Include user credentials in the request body
      });
  
      if (response.ok) {
        // Perform additional actions after a successful login
        // ...
  
        // Call the parent component's login callback
        onLogin();
      } else {
        // Handle login failure
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  
  
  
  const renderLoginForm = () => (
    <div className="app-section">
      <h2>Login</h2>
      <form>
        {renderInput('username', 'Username')}
        {renderInput('password', 'Password', 'password')}
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

  const renderInput = (id, label, type = 'text') => (
    <>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        value={loginData[id]}
        onChange={(e) => handleInputChange(id, e.target.value)}
        required
      />
    </>
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
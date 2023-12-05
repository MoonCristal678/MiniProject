import React, { useState } from 'react';
import { registerUser } from '../api';

const RegistrationForm = ({ onRegister }) => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field, value) => {
    setRegistrationData({ ...registrationData, [field]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(registrationData);
      const errorData = await response.json();
  
      if (response.ok) {
        // Registration successful, notify the parent component
        alert("Registration Successful!");
        onRegister();
      } else {
        // Registration failed, get the error message from the response
        if (errorData.message.includes('Username is already taken. Please choose a different one.') || errorData.message.includes('An email is already associated with this account please login or choose a different email.')) {
          setErrorMessage('Username or email is already associated with an existing account. Please choose a different one or log in.');
        } else {
          setErrorMessage('Registration failed. Please try again.');
          return;
        }
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error('Error registering user:', error);
      setErrorMessage('Username or email is already associated with an existing account. Please choose a different one or log in.');
    }
  
  };

  const renderInput = (id, label, type = 'text') => (
    <>
      <label htmlFor={id}>{label}:</label>
    <input
      type={type}
      id={id}
      value={registrationData[id]}
      onChange={(e) => handleInputChange(id, e.target.value)}
     
      required
    />
    </>
  );

  return (
    <div className="app-section">
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form>
        {renderInput('username', 'Username')}
        {renderInput('email', 'Email', 'email')}
        {renderInput('password', 'Password', 'password')}
        
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <p>
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
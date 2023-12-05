import React, { useState } from 'react';
import { addUser, loginUser, registerUser } from '../api';

// Common Input Component
const InputField = ({ id, label, type = 'text', value, onChange }) => (
  <>
    <label htmlFor={id}>{label}:</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      required
    />
  </>
);

// Common Form Component
const CommonForm = ({ title, fields, buttonText, onSubmit, additionalContent }) => {
  const [formData, setFormData] = useState(fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      const response = await onSubmit(formData);

      if (response.ok) {
        alert(`${title} Successful!`);
        setFormData(fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || `${title} failed`);
      }
    } catch (error) {
      console.error(`Error during ${title.toLowerCase()}:`, error);
      setErrorMessage(`${title} failed. Please try again.`);
    }
  };

  return (
    <div className="app-section">
      <h2>{title}</h2>
      <form>
        {fields.map((field) => (
          <InputField
            key={field}
            id={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleInputChange}
          />
        ))}
        <button type="button" onClick={handleSubmit}>
          {buttonText}
        </button>
        {additionalContent && additionalContent()}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

// AddUserForm Component
const AddUserForm = ({ onAddUser }) => {
  const onSubmit = async (data) => {
    const response = await addUser(data);
    if (response.ok) {
      const addedUser = await response.json();
      onAddUser(addedUser);
      return response;
    } else {
      return response;
    }
  };

  return (
    <CommonForm
      title="Add User"
      fields={['name', 'age', 'bloodType', 'birthdate', 'countryOfBirth']}
      buttonText="Add User"
      onSubmit={onSubmit}
    />
  );
};

// LoginForm Component
const LoginForm = ({ onLogin, redirectToRegisterPage }) => {
  const onSubmit = async (data) => {
    const response = await loginUser(data);
    if (response.ok) {
      onLogin();
      return response;
    } else {
      return response;
    }
  };

  return (
    <CommonForm
      title="Login"
      fields={['username', 'password']}
      buttonText="Login"
      onSubmit={onSubmit}
      additionalContent={() => (
        <>
          <button type="button" onClick={redirectToRegisterPage}>
            Register
          </button>
        </>
      )}
    />
  );
};

// RegistrationForm Component
const RegistrationForm = ({ onRegister }) => {
  const onSubmit = async (data) => {
    return await registerUser(data);
  };

  return (
    <CommonForm
      title="Register"
      fields={['username', 'email', 'password']}
      buttonText="Register"
      onSubmit={onSubmit}
      additionalContent={() => (
        <>
          <p>
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </>
      )}
    />
  );
};

export { AddUserForm, LoginForm, RegistrationForm };

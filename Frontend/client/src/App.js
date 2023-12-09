// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Forms/LoginForm';
import Welcome from './Forms/Welcome';
import AllForms from './Forms/AllForms';
import RegisterForm from './Forms/RegistrationForm';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/all-forms" element={<AllForms />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;

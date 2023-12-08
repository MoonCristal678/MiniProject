import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Forms/LoginForm';
import Welcome from './Forms/Welcome';
import AllForms from './Forms/AllForms';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/all-forms" element={<AllForms />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

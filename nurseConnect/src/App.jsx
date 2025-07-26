import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/dashboard/Dashboard';
import JobDescription from './components/JobDescription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/jobdescription" element={<JobDescription />} />
      </Routes>
    </Router>
  );
}

export default App;

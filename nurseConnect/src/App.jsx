import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobDescription from './components/JobDescription';
import Loading from './components/Loading'; 

// Lazily load major components
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Homepage = lazy(() => import('./pages/Homepage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/jobdescription" element={<JobDescription />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
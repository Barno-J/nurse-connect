import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useUser } from './contexts/userContext';
import Loading from './components/Loading';

// Lazily load major components
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const JobDescription = lazy(() => import('./components/JobDescription'));
const Homepage = lazy(() => import('./pages/Homepage'));

function App() {
  const { user } = useUser();
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobdescription"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <JobDescription />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
import React from 'react';
import NurseDashboard from './NurseDashboard';

const getUserType = () => {
  // Temporary mock logic
  return localStorage.getItem('userType') || 'nurse';
};

const Dashboard = () => {
  const userType = getUserType();

  switch (userType) {
    case 'hospital':
      return <HospitalDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'nurse':
    default:
      return <NurseDashboard />;
  }
};

export default Dashboard;

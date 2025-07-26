import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`py-6 mt-12 border-t ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-lg font-semibold">Connecting Nurses with Hospitals</h2>
        <p className="mt-2 text-sm">
          Find your perfect locum nursing opportunity or fill staffing gaps quickly with our dedicated platform.
        </p>
        <p className="mt-4 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} NurseConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
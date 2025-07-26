import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Form = ({ onSubmit, children, className = '' }) => {
  const { isDark } = useTheme();

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-xl p-6 w-full max-w-lg mx-auto shadow-md transition-all
        ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1 text-sm font-medium ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
          ${isDark
            ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
            : 'bg-white text-gray-800 border-gray-300 placeholder-gray-500'
          }`}
      />
    </div>
  );
};

export default Input;
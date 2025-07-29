import React from 'react';

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

  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-primary"
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
        className="w-full px-4 py-2 border rounded-lg bg-card text-primary border-primary placeholder:text-accent/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
      />
    </div>
  );
};

export default Input;
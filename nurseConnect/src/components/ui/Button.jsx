import React from 'react';
import clsx from 'clsx';

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary',
}) => {
  const base = `font-semibold py-2 px-4 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`;

  const variantClass = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    ghost: 'bg-transparent text-accent hover:underline',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    icon: 'icon-primary hover:icon-accent p-1 bg-transparent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variantClass[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
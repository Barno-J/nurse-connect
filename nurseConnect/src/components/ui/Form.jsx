import React from 'react';

const Form = ({ onSubmit, children, className = '' }) => {

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-xl p-6 w-full max-w-lg mx-auto shadow-theme transition-all
    bg-card text-primary ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
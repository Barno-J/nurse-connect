import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-md mx-4 p-6 rounded-xl shadow-lg relative transition-all ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Close button */}
        <Button
		  type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-lg font-bold hover:text-red-500"
        >
          &times;
        </Button>

        {title && (
          <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

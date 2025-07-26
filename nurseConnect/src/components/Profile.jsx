import React, { useState } from 'react';
import { FaMoon, FaSun, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';

const Profile = ({ name = 'John Doe', onLogout, onSettings }) => {
  const { isDark, setIsDark } = useTheme();
  const [openDropdown, setOpenDropdown] = useState(false);
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);
  const closeDropdown = () => setOpenDropdown(false);

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <Button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow ${
          isDark
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {initials}
      </Button>

      {/* Dropdown */}
      {openDropdown && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <Button
            onClick={() => {
              setIsDark(!isDark);
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? (
              <FaSun className="mr-2 text-yellow-400" />
            ) : (
              <FaMoon className="mr-2 text-gray-600" />
            )}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>

          <Button
			type="button"
            onClick={() => {
              onSettings?.();
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaCog className="mr-2" />
            Settings
          </Button>

          <Button
			type="button"
            onClick={() => {
              onLogout?.();
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
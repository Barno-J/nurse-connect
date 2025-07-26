import React, { useState } from 'react';
import { FaMoon, FaSun, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Button from './ui/Button';
import { useTheme } from '../contexts/ThemeContext';


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
        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-theme bg-secondary text-primary hover:bg-accent"
      >
        {initials}
      </Button>

      {/* Dropdown */}
      {openDropdown && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg shadow-theme py-2 z-50 bg-card text-primary"
        >
          <Button
            onClick={() => {
              setIsDark(!isDark); // still used for logic/display
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-secondary-hover"
          >
            {isDark ? (
              <FaSun className="mr-2 icon-accent" />
            ) : (
              <FaMoon className="mr-2 icon-dark" />
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
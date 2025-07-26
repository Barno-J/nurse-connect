import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

const navItems = {
  nurse: [
    { label: 'Dashboard', href: '/nurse/dashboard' },
    { label: 'My Shifts', href: '/nurse/shifts' },
    { label: 'Profile', href: '/nurse/profile' },
  ],
  hospital: [
    { label: 'Dashboard', href: '/hospital/dashboard' },
    { label: 'Post Shift', href: '/hospital/post' },
    { label: 'Nurses', href: '/hospital/nurses' },
  ],
  admin: [
    { label: 'Admin Panel', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
  ],
};

const Sidebar = ({ userType = 'nurse', onClose }) => {
  const { isDark } = useTheme();
  const links = navItems[userType] || [];

  return (
    <aside
      className={`w-64 h-full p-6 transform transition-transform duration-300 ease-in-out bg-card text-primary shadow-theme`}
    >
      <h2 className="text-lg font-bold mb-6 capitalize">{userType} Menu</h2>
      <ul className="space-y-4">
        {links.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block hover:underline text-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        onClick={onClose}
        className="mt-8 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Close
      </Button>
    </aside>
  );
};

export default Sidebar;

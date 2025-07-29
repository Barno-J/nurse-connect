import React from 'react';
import {
  FiHome,
  FiCalendar,
  FiDollarSign,
  FiClipboard,
  FiMessageSquare,
  FiHelpCircle
} from 'react-icons/fi';

const navItems = {
  nurse: [
    { label: 'Dashboard', href: '/nurse/dashboard', icon: FiHome },
    { label: 'My Shifts', href: '/nurse/shifts', icon: FiCalendar },
    { label: 'Earnings', href: '/nurse/earnings', icon: FiDollarSign },
    { label: 'Compliance', href: '/nurse/compliance', icon: FiClipboard },
    { label: 'Messages', href: '/nurse/messages', icon: FiMessageSquare },
    { label: 'Support', href: '/nurse/support', icon: FiHelpCircle },
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
  const links = navItems[userType] || [];

  return (
    <aside className="w-64 h-full p-6 bg-card text-primary shadow-theme relative overflow-y-auto">
      <h2 className="text-lg font-bold mb-6 capitalize">{userType} Menu</h2>
      <ul className="space-y-4">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="mb-6">
              <a href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-primary"
              >
                {Icon && <Icon className="text-xl" />}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;

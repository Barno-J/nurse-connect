import React from 'react';
import Profile from '../Profile';
import Button from './Button';
import { FiMenu, FiBell } from 'react-icons/fi';

const Header = ({
  title = 'NurseConnect',
  buttons = [],
  onSettings,
  onLogout,
  onMenuToggle,
}) => {

  return (
    <header className="w-full px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 shadow-theme bg-card text-primary">
      <button
        className="md:hidden p-3 text-xl"
        onClick={onMenuToggle}
      >
        <FiMenu />
      </button>

      <div className="text-xl font-bold">{title}</div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Buttons hidden on small screens */}
        <div className="hidden md:flex gap-3">
          {buttons.map((btn, index) => (
            <Button key={index} onClick={btn.onClick} className={btn.className}>
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Notification */}
        <div className="relative">
          <button className="relative text-xl p-2 rounded-full hover:bg-card-secondary transition">
            <FiBell className="text-primary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>
        </div>

        <Profile name="Francis Rombo" onSettings={onSettings} onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;

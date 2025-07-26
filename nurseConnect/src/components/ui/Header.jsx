import React from 'react';
import Profile from '../Profile';
import Button from './Button';

const Header = ({
  title = 'NurseConnect',
  buttons = [],
  onSettings,
  onLogout,
}) => {

  return (
    <header
      className="w-full px-6 py-4 flex items-center justify-between shadow-theme bg-card text-primary"
    >
      <div className="text-xl font-bold">{title}</div>

      <div className="flex gap-3">
        {buttons.map((btn, index) => (
          <Button key={index} onClick={btn.onClick} className={btn.className}>
            {btn.label}
          </Button>
        ))}
      </div>

      <Profile name="Francis Rombo" onSettings={onSettings} onLogout={onLogout} />
    </header>
  );
};

export default Header;

import React from 'react';
import imgLogo from './images/header-logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <a href="/" className="header__logo-link">
              <img src={imgLogo} alt="Test task" />
            </a>
          </div>
          <div className="header__actions">
            <a href="#employees" className="btn">
              Users
            </a>
            <a href="#form" className="btn">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

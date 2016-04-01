import React from 'react';
import worona from './worona.png';
// import style from './style.css';

export const Header = () => (
  <section className="hero is-info">
    <header className="header">
      <div className="container">
        {/* Left side*/}
        <div className="header-left">
          <a className="header-item" href="/">
            <img src={worona} alt="Logo" />
          </a>
        </div>

        {/* Hamburger menu (on mobile) */}
        <span className="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        {/* Right side */}
        <div className="header-right header-menu">
          <span className="header-item">
            <a href="https://docs.worona.org">Docs</a>
          </span>
          <span className="header-item">
            <a href="https://forums.worona.org">Forums</a>
          </span>
          <span className="header-item">
            <a href="https://support.worona.org">Support</a>
          </span>
          <span className="header-item">
            <a className="button" href="#">Login</a>
          </span>
        </div>
      </div>
    </header>
  </section>
);

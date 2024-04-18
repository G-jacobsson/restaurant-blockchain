import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/layout.css';
import logo from '../assets/images/logo-restaurant-hwg.jpg';

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <header className="site-header">
        <div className="logo-container">
          <img
            className="logo"
            src={logo}
            alt="Logo"
          />
        </div>
        <nav>
          <input
            type="checkbox"
            className="toggle-menu"
            checked={menuOpen}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <div className="hamburger"></div>
          <ul className="menu">
            <li>
              <NavLink
                to={'/'}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/booktable'}
                onClick={() => setMenuOpen(false)}
              >
                Book a Table
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/bookings'}
                onClick={() => setMenuOpen(false)}
              >
                Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/contact'}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>@copyright HWG - The Restaurant</p>
      </footer>
    </div>
  );
};

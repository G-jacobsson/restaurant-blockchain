import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/layout.css';
import logo from '../assets/images/logo-restaurant-hwg.jpg';

export const Layout = () => {
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
          />
          <div className="hamburger"></div>
          <ul className="menu">
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/booktable'}>Book a Table</NavLink>
            </li>
            <li>
              <NavLink to={'/bookings'}>Bookings</NavLink>
            </li>
            <li>
              <NavLink to={'/contact'}>Contact</NavLink>
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

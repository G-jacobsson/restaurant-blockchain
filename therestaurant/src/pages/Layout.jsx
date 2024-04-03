import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/layout.css";

export const Layout = () => {
  return (
    <div className='container'>
      <header className='site-header'>
        <h1 className='butterfly-kids-regular'>End of The World</h1>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/booktable"}>Book a Table</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact Us</NavLink>
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

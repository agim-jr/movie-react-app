import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav__logo">
        MOVIEFLIX
      </NavLink>
      <ul className="nav__menu">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/find-movie" className="nav__link">
            Find your movie
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/contact" className="nav__link">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

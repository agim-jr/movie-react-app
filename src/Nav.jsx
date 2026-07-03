import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Nav() {
  return (
    <nav className="navbar">
      <div className="nav__container">
        <NavLink to="/" className="nav__logo">
          <img src=".\MovieApp.png" alt="Movie Logo" className="nav__logo-image" />
        </NavLink>
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink to="/" className="nav__link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/find-movie" className="nav__link" activeClassName="active">
              Find your movie
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/contact" className="nav__link" activeClassName="active">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

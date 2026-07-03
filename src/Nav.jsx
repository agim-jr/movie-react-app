import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          My App
        </Link>
        <ul className="nav__menu">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/about" className="nav__link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

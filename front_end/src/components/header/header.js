import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Employee Turnover Analysis</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">
          home
        </Link>
      </nav>
    </header>
  );
};

export default Header;

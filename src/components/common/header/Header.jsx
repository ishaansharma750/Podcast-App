import React from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="navbar">
      <div className="gredient"></div>
      <div className="links">
        <Link to="/" className={currentPath == "/" ? "active" : ""}>
          SignUp
        </Link>
        <Link
          to="/podcast"
          className={currentPath == "/podcast" ? "active" : ""}>
          Podcast
        </Link>
        <Link
          to="/create-podcast"
          className={currentPath == "/create-podcast" ? "active" : ""}>
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath == "/profile" ? "active" : ""}>
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;

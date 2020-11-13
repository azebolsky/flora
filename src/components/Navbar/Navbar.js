import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userStatus }) => {
  return userStatus.authenticated ? (
    <div className="nav-container">
      <NavLink exact to="">
        Home
      </NavLink>
      <NavLink exact to="/plants">
        Plants
      </NavLink>
      <NavLink exact to="/profilePage">
        Profile
      </NavLink>
    </div>
  ) : (
    <div className="nav-container">
      <NavLink exact to="">
        Home
      </NavLink>
      <NavLink exact to="/plants">
        Plants
      </NavLink>
      <NavLink exact to="/register">
        Register
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default withRouter(Navbar);

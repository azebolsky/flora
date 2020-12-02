import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import styled from "styled-components";

const StyledNav = styled.nav`
  font-family: var(--logo-font);
  font-size: 30px;
`;

const Navbar = ({ userStatus }) => {
  return userStatus.authenticated ? (
    <StyledNav className="nav-container">
      <NavLink exact to="">
        Home
      </NavLink>
      <NavLink exact to="/plants">
        Plants
      </NavLink>
      <NavLink exact to="/profilePage">
        Profile
      </NavLink>
    </StyledNav>
  ) : (
    <StyledNav className="nav-container">
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
    </StyledNav>
  );
};

export default withRouter(Navbar);

import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: var(--logo-font);
  font-size: 30px;
  padding: 10px 0;
  background-color: var(--primary-color);
  position: sticky;
  top: 0;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #05be70;
  }
`;

const Navbar = ({ userStatus }) => {
  return userStatus.authenticated ? (
    <StyledNav>
      <NavLink exact to="/plants">
        All Plants
      </NavLink>
      <NavLink exact to={`/user/${userStatus.id}`}>
        Welcome, {userStatus.displayName}
      </NavLink>
    </StyledNav>
  ) : (
    <StyledNav>
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

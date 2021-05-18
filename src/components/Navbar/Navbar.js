import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import ProfileImage from "../../Assets/Profile Image.png";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-family: var(--logo-font);
  font-size: calc(20px + 1vmin);
  padding: 10px 0;
  background-color: var(--primary-color);
  position: sticky;
  top: 0;
  z-index: 500;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #05be70;
  }

  i {
    font-size: 40px;
  }
  .nav-profile {
    display: flex;
    align-items: center;
  }
`;

const ProfImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  align-self: flex-end;
`;

const Navbar = ({ userStatus }) => {
  return userStatus.authenticated ? (
    <StyledNav>
      <NavLink exact to="/">
        <i className="fab fa-pagelines"></i>
      </NavLink>
      <NavLink exact to="/plants">
        Plants
      </NavLink>
      <NavLink exact to={`/user/${userStatus.id}/plants`}>
        Your Garden
      </NavLink>
      <NavLink className="nav-profile" exact to={`/user/${userStatus.id}`}>
        <ProfImage
          src={userStatus.photoURL ? userStatus.photoURL : ProfileImage}
        />
        {userStatus.displayName
          ? userStatus.displayName
              .split(" ")
              .map((n) => n[0])
              .join(".")
          : "Profile"}
        .
      </NavLink>
    </StyledNav>
  ) : (
    <StyledNav>
      <NavLink exact to="/">
        <i className="fab fa-pagelines"></i>
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

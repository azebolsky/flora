import React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../../Assets/plant-background.jpg";
import styled from "styled-components";

const StyledLayout = styled.section`
  min-height: 100vh;
  width: 100vw;
  background: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: var(--logo-font);
    font-size: 40px;
    letter-spacing: 0.1em;
  }
`;

const StyledLink = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color: grey;
  }
`;

const Home = () => {
  return (
    <StyledLayout>
      <h1>Welcome to Flora</h1>
      <StyledLink>
        <Link to="/login">Login Here</Link>
      </StyledLink>
      <p>or</p>
      <StyledLink>
        <Link to="/plants">View Some Plants</Link>
      </StyledLink>
    </StyledLayout>
  );
};

export default Home;

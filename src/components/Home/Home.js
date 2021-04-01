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
    font-size: calc(25px + 2vmin);
    letter-spacing: 0.1em;
  }
`;

const Container = styled.div`
  width: calc(100vw - 2em);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const StyledLink = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  font-size: calc(8px + 2vmin);

  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color: grey;
  }
`;

const Home = ({ authStatus }) => {
  console.log(authStatus);
  return (
    <StyledLayout>
      <h1>Welcome to Flora</h1>
      <Container>
        <StyledLink>
          {!authStatus.authenticated ? (
            <>
              <Link to="/login">Login </Link>
              or
              <Link to="/register"> Signup</Link>
            </>
          ) : (
            <>
              <Link to={`/user/${authStatus.id}/plants`}>Your Plants</Link>
            </>
          )}
        </StyledLink>
        <StyledLink>
          <Link to="/plants">View Some Plants</Link>
        </StyledLink>
      </Container>
    </StyledLayout>
  );
};

export default Home;

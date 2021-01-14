import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase";
import styled from "styled-components";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  margin: 0;
`;

const StyledHeader = styled.h1`
  margin: 0;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: 1px 10px 10px 10px;
  width: 55%;
  min-width: 350px;
  padding: 15px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: 1px 10px 10px 10px;
    width: 55%;
    min-width: 350px;
    padding: 15px;
  }
`;

const LoginInputs = styled.div`
  background: var(--light-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  border-radius: 5px;
  margin: 5px 0 10px 0;
  padding: 8px 5px 5px 5px;
  width: 100%;
  a {
    color: rgb(73, 177, 254);
    text-decoration: none;
    width: 100%;
    text-align: right;
    margin: 5px;
  }

  input {
    margin: 5px;
    font-size: 16px;
    min-width: 95%;
    border-radius: 5px;
    height: 40px;
    padding-left: 8px;
    border: none;
  }
`;
const GoogleContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 15px;
  .fa-google {
    font-size: 25px;
    padding: 10px 15px;
    background-color: var(--light-shadow);
    border-radius: 5px;
    border-bottom: 5px solid rgb(73, 177, 254);
    cursor: pointer;
  }
  .fa-google:hover {
    background-color: rgb(73, 177, 254);
  }
`;
const OptionContainer = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  .line {
    height: 0.1px;
    width: 20%;
    background-color: grey;
    margin: 0 10px;
  }
  p {
    padding: 0;
    margin: 0;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  a {
    color: rgb(73, 177, 254);
    text-decoration: none;
    width: 100%;
    text-align: right;
    margin: 5px 10px 5px 5px;
    color: white;
  }
`;
const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  color: black;
  background-color: rgb(73, 177, 254);
  border-radius: 5px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: rgb(73, 190, 254);
  }
`;

const LoginForm = ({ authStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with email and password");
      console.log("error: " + error);
    });
  };

  const onChangeHandler = (event) => {
    event.target.name === "userEmail"
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  };

  return authStatus.authenticated && !error ? (
    <Redirect exact to={`/user/${authStatus.id}`} />
  ) : (
    <LoginWrapper>
      <StyledHeader>Sign In with</StyledHeader>
      <StyledSection>
        <GoogleContainer>
          <div
            onClick={() => {
              signInWithGoogle();
            }}
          >
            <i className="fab fa-google"></i>
          </div>
        </GoogleContainer>
        <OptionContainer>
          <div className="line"></div>
          <p>or</p>
          <div className="line"></div>
        </OptionContainer>
        <form>
          <LoginInputs>
            <input
              name="userEmail"
              type="email"
              value={email}
              placeholder="Email"
              onChange={onChangeHandler}
            />
            <input
              name="userPassword"
              type="password"
              value={password}
              placeholder="Password"
              onChange={onChangeHandler}
            />
            <Link to="passwordReset">Forgot Password?</Link>
          </LoginInputs>
          <ButtonContainer>
            <Link to="register">Need an account?</Link> <br />{" "}
            <SubmitButton
              type="submit"
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Submit
            </SubmitButton>
          </ButtonContainer>
        </form>
      </StyledSection>
    </LoginWrapper>
  );
};

export default LoginForm;

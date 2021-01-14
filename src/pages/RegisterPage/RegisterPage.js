import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, generateUserDocument, signInWithGoogle } from "../../firebase";
import styled from "styled-components";

const RegisterWrapper = styled.div`
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

const RegisterInputs = styled.div`
  background: var(--light-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  border-radius: 5px;
  margin: 5px 0 10px 0;
  padding: 8px 5px 8px 5px;
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
  justify-content: space-between;
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
const CurrentUser = styled.p`
  a {
    text-decoration: none;
    color: rgb(73, 177, 254);
  }
`;

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [duplicatePassword, setDuplicatePassword] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error signing up with email and password");
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    if (event.target.name === "userEmail") {
      setEmail(event.target.value);
    } else if (event.target.name === "displayName") {
      setDisplayName(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "duplicatePassword") {
      setDuplicatePassword(event.target.value);
    }
  };

  return props.authStatus.authenticated && !error ? (
    <Redirect
      to={{
        pathname: "/profilePage",
        state: { displayName: displayName },
      }}
    />
  ) : (
    <RegisterWrapper>
      <StyledHeader>Register with</StyledHeader>
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
        <form className="register-form-container">
          <RegisterInputs>
            <input
              name="userEmail"
              type="text"
              value={email}
              placeholder="Email"
              onChange={onChangeHandler}
            />
            <input
              name="displayName"
              type="text"
              value={displayName}
              placeholder="Display Name"
              onChange={onChangeHandler}
            />
            <input
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={onChangeHandler}
            />
            <input
              name="duplicatePassword"
              type="password"
              value={duplicatePassword}
              placeholder="Re-enter Password"
              onChange={onChangeHandler}
            />
          </RegisterInputs>
          <ButtonContainer>
            <CurrentUser>
              Already have an account? <Link to="login">Login</Link> <br />{" "}
            </CurrentUser>
            <SubmitButton
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Submit
            </SubmitButton>
          </ButtonContainer>
        </form>
      </StyledSection>
    </RegisterWrapper>
  );
};

export default RegisterForm;

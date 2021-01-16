import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import styled from "styled-components";

const ResetWrapper = styled.div`
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

const StyledHeader = styled.h1`
  margin: 0;
`;

const ResetInputs = styled.div`
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
  width: 175px;
  height: 45px;
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

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    event.target.name = "userEmail" ? setEmail(event.target.value) : "";
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("error resetting password");
      });
  };

  return (
    <ResetWrapper>
      <StyledHeader>Reset your password</StyledHeader>
      <StyledSection>
        <form action="">
          {emailSent && <div>Check your email inbox for a reset message!</div>}
          {error && <div>{error}</div>}
          <ResetInputs>
            {/* <label htmlFor="userEmail">Email</label> */}
            <input
              htmlFor="userEmail"
              name="userEmail"
              type="email"
              value={email}
              placeholder="Input email here"
              onChange={onChangeHandler}
            />
          </ResetInputs>
          <ButtonContainer>
            <Link to="login">Head back to Login</Link>
            <SubmitButton onClick={sendResetEmail}>
              Send Reset Link
            </SubmitButton>
          </ButtonContainer>
        </form>
      </StyledSection>
    </ResetWrapper>
  );
};

export default PasswordReset;

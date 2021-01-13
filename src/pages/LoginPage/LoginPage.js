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

  h1 {
    margin: 0;
  }

  section,
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: 10px;
    width: 55%;
    min-width: 350px;
    padding: 15px;
  }

  .login-inputs {
    background: var(--light-shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
    width: 100%;
  }

  .login-inputs > a {
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

  .google-signin {
    width: 80%;
    display: flex;
    justify-content: center;
    border-radius: 5px;
  }

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

  .submit-btn-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .submit-btn-container > a {
    color: rgb(73, 177, 254);
    text-decoration: none;
    width: 100%;
    text-align: right;
    margin: 5px 10px 5px 5px;
    color: white;
  }

  .submit-btn-container > .submit-btn {
    width: 120px;
    height: 40px;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(73, 177, 254);
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }
  .submit-btn:hover {
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
      <h1>Sign In with</h1>
      <section>
        <div className="google-signin">
          <div
            onClick={() => {
              signInWithGoogle();
            }}
          >
            <i class="fab fa-google"></i>
          </div>
        </div>
        <p>or</p>
        <form>
          <div className="login-inputs">
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
          </div>
          <div className="submit-btn-container">
            <Link to="register">Need an account?</Link> <br />{" "}
            <button
              className="submit-btn"
              type="submit"
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </LoginWrapper>
  );
};

export default LoginForm;

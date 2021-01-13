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
    width: 30%;
    padding: 15px;
  }

  form {
    background: var(--light-shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: 10px;
    width: 80%;
    border-radius: 5px;
  }

  .google-signin {
    background: var(--light-shadow);
    width: 80%;
    display: flex;
    justify-content: center;
    border-radius: 5px;
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
      <h1>login form</h1>
      <section>
        <div className="google-signin">
          <button
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Sign In with Google
          </button>
        </div>
        <p>or</p>
        <form>
          <label>
            <input
              name="userEmail"
              type="email"
              value={email}
              placeholder="Email"
              onChange={onChangeHandler}
            />
          </label>
          <label>
            <input
              name="userPassword"
              type="password"
              value={password}
              placeholder="Password"
              onChange={onChangeHandler}
            />
          </label>
          <button
            type="submit"
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Submit
          </button>
        </form>

        <p>
          Don't have an account? <Link to="register">Sign up here</Link> <br />{" "}
          <Link to="passwordReset">Forgot Password?</Link>
        </p>
      </section>
    </LoginWrapper>
  );
};

export default LoginForm;

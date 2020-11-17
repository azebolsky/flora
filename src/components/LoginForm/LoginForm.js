import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase";

const LoginForm = ({ userStatus }) => {
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

  return userStatus.authenticated && !error ? (
    <Redirect to="/profilePage" />
  ) : (
    <div>
      <h1>login form</h1>
      <form className="register-form-container">
        <label>
          Email
          <input
            name="userEmail"
            type="email"
            value={email}
            placeholder="Email"
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Password
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
      <p>or</p>
      <button
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
      <p>
        Don't have an account? <Link to="register">Sign up here</Link> <br />{" "}
        <Link to="passwordReset">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default LoginForm;

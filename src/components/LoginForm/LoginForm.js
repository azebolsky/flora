import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const SubmitWithUsernameAndPassword = (event, email, password) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
  };

  const onChangeHandler = (event) => {
    event.target.name === "userEmail"
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  };

  return (
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
            SubmitWithUsernameAndPassword(event, email, password);
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

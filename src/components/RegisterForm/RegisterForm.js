import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [duplicatePassword, setDuplicatePassword] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (
    event,
    email,
    password,
    duplicatePassword
  ) => {
    event.preventDefault();
    if (duplicatePassword === password) {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setDuplicatePassword("");
    } else {
      console.log(password, duplicatePassword);
      console.log("passwords do not match");
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

  return (
    <div className="register-container">
      <h1>Register Form</h1>
      <form className="register-form-container">
        <label>
          Email
          <input
            name="userEmail"
            type="text"
            value={email}
            placeholder="ex: person@person.com"
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Display Name
          <input
            name="displayName"
            type="text"
            value={displayName}
            placeholder="Display Name"
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Re-enter Password
          <input
            name="duplicatePassword"
            type="password"
            value={duplicatePassword}
            placeholder="Re-enter Password"
            onChange={onChangeHandler}
          />
        </label>
        <button type="submit" onClick={createUserWithEmailAndPasswordHandler}>
          Submit
        </button>
      </form>
      <p>or</p>
      <button>Sign in with Google</button>
      <p>
        Don't have an account? <Link to="register">Sign up here</Link> <br />{" "}
        <Link to="passwordReset">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./RegisterForm.css";
import { auth, generateUserDocument } from "../../firebase";

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
    console.log("email line 19: " + email);
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
    setEmail("");
    setPassword("");
    setDisplayName("");
    // setDuplicatePassword("");
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
    <Redirect to="/profilePage" />
  ) : (
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
        <button
          onClick={(event) => {
            createUserWithEmailAndPasswordHandler(event, email, password);
          }}
        >
          Submit
        </button>
      </form>
      <p>or</p>
      <button>Sign in with Google</button>
      <p>
        Already have an account? <Link to="login">Login Here</Link> <br />{" "}
        <Link to="passwordReset">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default RegisterForm;

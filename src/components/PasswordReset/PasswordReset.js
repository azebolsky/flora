import React, { useState } from "react";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    event.target.name = "userEmail" ? setEmail(event.target.value) : "";
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Reset your password</h1>
      <form action="">
        {emailSent && <div>Check your email inbox for a reset message!</div>}
        {error && <div>{error}</div>}
        <label htmlFor="userEmail">Email</label>
        <input
          name="userEmail"
          type="email"
          value={email}
          placeholder="Input email here"
          onChange={onChangeHandler}
        />
        <button>Send me a reset link</button>
      </form>
      <Link to="/login">Back to Sign In Page</Link>
    </div>
  );
};

export default PasswordReset;

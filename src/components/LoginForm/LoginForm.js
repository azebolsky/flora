import React from "react";

const LoginForm = () => {
  return (
    <div>
      <h1>login form</h1>
      <form className="register-form-container">
        <label>
          Username
          <input placeholder="Username" />
        </label>
        <label>
          Password
          <input placeholder="Password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;

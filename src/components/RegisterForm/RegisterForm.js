import React from "react";
import "./RegisterForm.css";

const RegisterForm = () => {
  return (
    <div className="register-container">
      <h1>Register Form</h1>
      <form className="register-form-container">
        <label>
          First Name
          <input placeholder="First Name" />
        </label>
        <label>
          Last Name
          <input placeholder="First Name" />
        </label>
        <label>
          Password
          <input placeholder="Password" />
        </label>
        <label>
          Re-enter Password
          <input placeholder="Re-enter Password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;

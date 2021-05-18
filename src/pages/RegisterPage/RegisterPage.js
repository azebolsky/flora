import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import RegisterSuccess from "../../components/RegisterSuccess/RegisterSuccess";

const RegisterPage = ({ authStatus }) => {
  return authStatus.authenticated ? (
    <>
      <RegisterSuccess />
    </>
  ) : (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;

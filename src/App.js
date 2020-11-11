import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import UserProvider from "./providers/UserProvider";
import "./App.css";

const App = () => {
  let user = null;
  const home = () => {
    return <Home />;
  };
  const plants = () => {
    return <h1>Plants</h1>;
  };
  const login = () => {
    return <LoginForm />;
  };
  const register = () => {
    return <RegisterForm />;
  };
  const passwordReset = () => {
    return <PasswordReset />;
  };
  return (
    <div>
      <UserProvider>
        <Navbar userStatus={user} />
      </UserProvider>
      <Switch>
        <Route exact path="/" component={home} />
        <Route path="/plants" component={plants} />
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />;
        <Route path="/passwordReset" component={passwordReset} />;
      </Switch>
    </div>
  );
};

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
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
  return (
    <div>
      <Navbar userStatus={user} />
      <Switch>
        <Route exact path="/" component={home} />
        <Route path="/plants" component={plants} />
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />;
      </Switch>
    </div>
  );
};

export default App;

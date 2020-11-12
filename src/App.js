import React, { useContext, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UserProvider from "./providers/UserProvider";
import { auth } from "./firebase";
import "./App.css";

const App = () => {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const clearObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          authenticated: true,
        });
      } else {
        setAuthState({
          displayName: null,
          photoURL: null,
          email: null,
          authenticated: false,
        });
      }
    });
    return () => {
      clearObserver();
    };
  }, []);

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
  const profilePage = () => {
    return <ProfilePage userStatus={authState} />;
  };
  return (
    <div>
      <UserProvider>
        <Navbar userStatus={authState} />
        <Switch>
          <Route exact path="/" component={home} />
          <Route path="/plants" component={plants} />
          <Route path="/login" component={login} />
          <Route path="/register" component={register} />;
          <Route path="/passwordReset" component={passwordReset} />;
          <Route path="/profilePage" component={profilePage} />;
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;

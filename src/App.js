import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UserProvider from "./providers/UserProvider";
import { auth, generateUserDocument } from "./firebase";
import "./App.css";

const App = () => {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const clearUser = auth.onAuthStateChanged((userAuth) => {
      const user = generateUserDocument(userAuth);
      if (userAuth) {
        setAuthState({
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL,
          email: userAuth.email,
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
      clearUser();
    };
  }, []);

  const home = () => {
    return <Home />;
  };
  const plants = () => {
    return <h1>Plants</h1>;
  };
  const login = () => {
    return <LoginForm userStatus={authState} />;
  };
  const register = () => {
    return <RegisterForm userStatus={authState} />;
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

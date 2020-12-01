import React, { useState, useEffect } from "react";
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

const App = (props) => {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const clearUser = auth.onAuthStateChanged((userAuth) => {
      // const authState = generateUserDocument(userAuth);
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
  return (
    <div>
      <UserProvider>
        <Navbar userStatus={authState} />
        <Switch>
          {/* <Route exact path="/" component={home} /> */}
          <Route exact path="/" render={(props) => <Home {...props} />} />
          {/* <Route path="/plants" render={(props) => <Plants {...props} />} /> */}
          <Route
            exact
            path="/login"
            render={(authState) => <LoginForm authStatus={authState} />}
          />
          <Route
            exact
            path="/register"
            render={(authState) => <RegisterForm authStatus={authState} />}
          />
          ;
          <Route
            exact
            path="/passwordReset"
            render={(authState) => <PasswordReset authStatus={authState} />}
          />
          ;
          <Route
            exact
            path="/profilePage"
            render={(props) => <ProfilePage {...props} />}
          />
          ;
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;

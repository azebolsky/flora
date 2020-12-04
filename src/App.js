import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { auth } from "./firebase";

const App = () => {
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
  console.log("Auth State line 40: " + authState.authenticated);

  return (
    <div>
      <Navbar userStatus={authState} />
      <Switch>
        <Route
          exact
          path="/"
          render={(authState) => <Home authStatus={authState} />}
        />
        <Route
          path="/login"
          render={(props) => <LoginForm {...props} authStatus={authState} />}
        />
        <Route
          path="/register"
          render={(props) => <RegisterForm {...props} authStatus={authState} />}
        />
        <Route
          path="/passwordReset"
          render={(props) => (
            <PasswordReset {...props} authStatus={authState} />
          )}
        />
        <Route
          path="/profilePage"
          render={(props) => <ProfilePage {...props} authStatus={authState} />}
        />
      </Switch>
    </div>
  );
};

export default App;

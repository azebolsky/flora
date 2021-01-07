import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import PlantPage from "./components/PlantPage/PlantPage";
import * as plantsAPI from "./services/api-service";
import { auth } from "./firebase";

const App = () => {
  const [authState, setAuthState] = useState({});
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      const userData = userUpdate(userAuth);
      return userData;
    });
    const fetchData = async () => {
      const plantData = !search
        ? await plantsAPI.getPlantsWithPageNumber(page)
        : await plantsAPI.getPlantsWithSearchAndPageNumber(page, search);
      setLoading(true);
      setItems(plantData.data);
    };
    return fetchData();
  }, [page, search]);

  const userUpdate = (userAuth) => {
    const currentUser = auth.currentUser;
    console.log(currentUser);
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
  };

  const nextPage = () => {
    let newPage = page;
    setPage((newPage += 1));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Navbar userStatus={authState} />
      <Switch>
        <Route
          exact
          path="/plants"
          render={(props) => (
            <Home
              {...props}
              authStatus={authState}
              newPage={nextPage}
              change={handleChange}
              plantItems={items}
              loadingStatus={loading}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => <LoginForm {...props} authStatus={authState} />}
        />
        <Route
          path="/register"
          render={(history, props) => (
            <RegisterForm {...props} history={history} authStatus={authState} />
          )}
        />
        <Route
          path="/passwordReset"
          render={(props) => (
            <PasswordReset {...props} authStatus={authState} />
          )}
        />
        <Route
          exact
          path={"/plants/:id"}
          render={(props) => (
            <PlantPage
              {...props}
              authStatus={authState}
              change={handleChange}
              plantItems={items}
              loadingStatus={loading}
            />
          )}
        />
        <Route
          path="/profilePage"
          render={(props) => (
            <ProfilePage
              {...props}
              authStatus={authState}
              name={authState.displayName}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default App;

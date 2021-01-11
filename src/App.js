import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PlantPage from "./pages/PlantPage/PlantPage";
import * as plantsAPI from "./services/api-service";
import { auth } from "./firebase";
import firebase from "firebase/app";

const App = () => {
  const [authState, setAuthState] = useState({});
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userPlants, setUserPlants] = useState([]);
  const firestore = firebase.firestore();

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

    return () => {
      fetchData();
      getUserData();
    };
  }, [page, search]);

  const userUpdate = (userAuth) => {
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

  const getUserData = () => {
    console.log("hey");
    if (firebase.auth().currentUser) {
      try {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        const response = firestore.doc(`users/${currentUser.uid}`).get();
        if (response.exists) {
          const userInfo = response.data();
          let userPlantList = userInfo.plants;
          console.log(userPlantList);
          setUserPlants(userPlantList);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("no user signed in yet");
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
          render={(props) => <LoginPage {...props} authStatus={authState} />}
        />
        <Route
          path="/register"
          render={(history, props) => (
            <RegisterPage {...props} history={history} authStatus={authState} />
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

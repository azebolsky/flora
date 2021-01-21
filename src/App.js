import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PlantPage from "./pages/PlantPage/PlantPage";
import SearchResults from "./components/SearchResults/SearchResults";
import SearchForm from "./components/SearchForm/SearchForm";
import * as plantsAPI from "./services/api-service";
import { auth } from "./firebase";
import firebase from "firebase/app";
import styled from "styled-components";
import PlantAddModal from "./components/PlantAddModal/PlantAddModal";

const StyledSearchForm = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background-brand-color);

  section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 20px auto;
  }
`;

const App = () => {
  const [authState, setAuthState] = useState({});
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userPlants, setUserPlants] = useState([]);
  const [plantAdded, setPlantAdded] = useState(false);
  const [plantDeleted, setPlantDeleted] = useState(false);
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
    return fetchData();
  }, [page, search]);

  const userUpdate = (userAuth) => {
    if (userAuth) {
      setAuthState({
        displayName: userAuth.displayName,
        photoURL: userAuth.photoURL,
        email: userAuth.email,
        id: userAuth.uid,
        authenticated: true,
      });
      return getUserData();
    } else {
      setAuthState({
        displayName: null,
        photoURL: null,
        email: null,
        id: null,
        authenticated: false,
      });
    }
  };

  const getUserData = async () => {
    console.log("get user data");
    if (firebase.auth().currentUser) {
      try {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        const response = await firestore.doc(`users/${currentUser.uid}`).get();
        if (response.exists) {
          const userInfo = response.data();
          let userPlantList = await userInfo.plants;
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
    e.preventDefault();
    setSearch(e.target.value);
  };

  const addModalChange = (e) => {
    e.preventDefault();
    {
      plantAdded ? setPlantAdded(false) : setPlantAdded(true);
    }
    if (plantAdded) {
      console.log("line 117");
      return <addModalChange />;
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const Results = items.map((item) => (
    <SearchResults
      key={item.id}
      id={item.id}
      image={item.image_url}
      commonName={item.common_name}
      familyCommonName={item.family_common_name}
      authStatus={authState}
      userPlantList={userPlants}
      getUserData={getUserData}
      addModalUpdate={addModalChange}
    />
  ));

  return (
    <>
      <Navbar userStatus={authState} />
      <button onClick={addModalChange}>add</button>
      {plantAdded ? <PlantAddModal /> : ""}
      <Switch>
        <Route
          exact
          path="/plants"
          render={() =>
            !loading ? (
              <>
                <div>Loading...</div>
              </>
            ) : (
              <StyledSearchForm>
                <SearchForm
                  searchTerm={search}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  clearSearch={clearSearch}
                />
                <section>{Results}</section>
                {!search || items.length > 19 ? (
                  <button onClick={nextPage}>next page</button>
                ) : (
                  ""
                )}
              </StyledSearchForm>
            )
          }
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
          path="/user/:id"
          render={(props) => (
            <>
              {authState.authenticated ? (
                <>
                  <ProfilePage
                    {...props}
                    authStatus={authState}
                    usersPlants={userPlants}
                    retrieveUserData={getUserData}
                  />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </>
          )}
        />
      </Switch>
    </>
  );
};

export default App;

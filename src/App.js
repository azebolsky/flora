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
import PlantAddModal from "./components/PlantAddModal/PlantAddModal";
import PlantDeleteModal from "./components/PlantDeleteModal/PlantDeleteModal";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Footer from "./components/Footer/Footer";
import * as plantsAPI from "./services/api-service";
import { auth } from "./firebase";
import firebase from "firebase/app";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const SearchFormContainer = styled.div`
  height: 100px;
  background-color: var(--background-brand-color);
`;

const Content = styled.section`
  flex: 1 0 auto;
`;

const PlantResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  grid-template-rows: 1fr;
  grid-template-areas: "Filter Plants";
  width: 95%;
  margin: 0 auto;
`;

const PaginationContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const App = () => {
  const [authState, setAuthState] = useState({});
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [userPlants, setUserPlants] = useState([]);
  const [plantAdded, setPlantAdded] = useState(false);
  const [plantDeleted, setPlantDeleted] = useState(false);
  const [totalPages, setTotalPages] = useState();
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
      setLoading(false);
      const parsedPlantData =
        typeof plantData === "string"
          ? await JSON.parse(plantData)
          : await plantData;
      const allPages = Math.ceil(parsedPlantData.meta.total / 20);
      setTotalPages(allPages);
      setItems(parsedPlantData.data);
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
    if (firebase.auth().currentUser) {
      try {
        const currentUser = firebase.auth().currentUser;
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

  const filterFamily = async (e) => {
    e.preventDefault();
    const family = e.target.id;
    const filterData = await plantsAPI.familyFilter(family);
    const parsedFilteredData =
      typeof filterData === "string"
        ? await JSON.parse(filterData)
        : await filterData;
    setItems(parsedFilteredData.data);
  };

  const changePage = (e) => {
    e.preventDefault();
    let newPage = e.target.id;
    setPage(parseInt(newPage));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const addModalChange = (e) => {
    e.preventDefault();
    setPlantAdded(true);
    setTimeout(() => {
      setPlantAdded(false);
    }, 3000);
  };

  const deleteModalChange = (e) => {
    e.preventDefault();
    setPlantDeleted(true);
    setTimeout(() => {
      setPlantDeleted(false);
    }, 3000);
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
      deleteModalUpdate={deleteModalChange}
    />
  ));

  return (
    <>
      <GlobalStyle />
      <Navbar userStatus={authState} />
      {plantAdded ? <PlantAddModal /> : ""}
      {plantDeleted ? <PlantDeleteModal /> : ""}
      <Switch>
        <Route
          exact
          path="/plants"
          render={() =>
            loading ? (
              <Content>
                <div>Loading...</div>
              </Content>
            ) : (
              <Content>
                <SearchFormContainer>
                  <SearchForm
                    searchTerm={search}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    clearSearch={clearSearch}
                  />
                </SearchFormContainer>
                <PlantResultsContainer>
                  <section>
                    <Filter filterFunc={filterFamily} />
                  </section>
                  <section>{Results}</section>
                </PlantResultsContainer>
                <PaginationContainer>
                  <Pagination
                    currentPage={page}
                    changePageNumber={changePage}
                    totalPages={totalPages}
                    loading={loading}
                  />
                </PaginationContainer>
              </Content>
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
              getUserData={getUserData}
              userPlantList={userPlants}
              addModalUpdate={addModalChange}
              deleteModalUpdate={deleteModalChange}
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
                    addModalUpdate={addModalChange}
                    deleteModalUpdate={deleteModalChange}
                  />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </>
          )}
        />
      </Switch>
      <Footer />
    </>
  );
};

export default App;

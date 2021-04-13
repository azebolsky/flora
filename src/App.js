import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PlantPage from "./pages/PlantPage/PlantPage";
import MyPlantsPage from "./pages/MyPlantsPage/MyPlantsPage";
import SearchResults from "./components/SearchResults/SearchResults";
import SearchForm from "./components/SearchForm/SearchForm";
import PlantAddModal from "./components/PlantAddModal/PlantAddModal";
import PlantDeleteModal from "./components/PlantDeleteModal/PlantDeleteModal";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import * as plantsAPI from "./services/api-service";
import { auth } from "./firebase";
import firebase from "firebase/app";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import IndividualPlantPage from "./pages/IndividualPlantPage/IndividualPlantPage";

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
  const [filter, setFilter] = useState("");
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
      let plantData;
      if (search) {
        plantData = await plantsAPI.getPlantsWithSearchAndPageNumber(
          page,
          search
        );
      } else if (filter) {
        plantData = await plantsAPI.familyFilter(filter);
      } else {
        plantData = await plantsAPI.getPlantsWithPageNumber(page);
      }
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
  }, [page, search, filter]);

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

  const filterFamily = async (e, status) => {
    e.preventDefault();
    const filterValue = e.target.id;
    if (status) {
      console.log("hey");
      setFilter(filter.filter((item) => item !== filterValue));
    } else {
      console.log("hey else");
      setFilter([...filter, filterValue]);
    }
    // const filterData = plantsAPI.familyFilter(filter);
    // await plantsAPI.getPlantsWithPageNumber(page);
    // const parsedFilteredData =
    //   typeof filterData === "string" ? JSON.parse(filterData) : filterData;
    // setItems(parsedFilteredData.data);
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
      {/* <Navbar userStatus={authState} /> */}
      {plantAdded ? <PlantAddModal /> : ""}
      {plantDeleted ? <PlantDeleteModal /> : ""}
      <Switch>
        <Route
          exact
          path="/plants"
          render={() =>
            loading ? (
              <Content>
                <Navbar userStatus={authState} />
                <div>Loading...</div>
              </Content>
            ) : (
              <Content>
                <Navbar userStatus={authState} />
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
        <Route exact path="/" render={() => <Home authStatus={authState} />} />
        <Route
          exact
          path="/login"
          render={(props) => (
            <>
              <Navbar userStatus={authState} />
              <LoginPage {...props} authStatus={authState} />
              <Footer />
            </>
          )}
        />
        <Route
          path="/register"
          render={(history, props) => (
            <>
              <Navbar userStatus={authState} />
              <RegisterPage
                {...props}
                history={history}
                authStatus={authState}
              />
              <Footer />
            </>
          )}
        />
        <Route
          path="/passwordReset"
          render={(props) => (
            <>
              <Navbar userStatus={authState} />
              <PasswordReset {...props} authStatus={authState} />
              <Footer />
            </>
          )}
        />
        <Route
          path="/user/:id/plants/:plantid"
          render={(props) => (
            <>
              {authState.authenticated ? (
                <>
                  <Navbar userStatus={authState} />
                  <IndividualPlantPage
                    {...props}
                    authStatus={authState}
                    usersPlants={userPlants}
                  />
                  <Footer />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </>
          )}
        />
        <Route
          path="/user/:id/plants"
          render={(props) => (
            <>
              {authState.authenticated ? (
                <>
                  <Navbar userStatus={authState} />
                  <MyPlantsPage
                    {...props}
                    authStatus={authState}
                    usersPlants={userPlants}
                    retrieveUserData={getUserData}
                    addModalUpdate={addModalChange}
                    deleteModalUpdate={deleteModalChange}
                  />
                  <Footer />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </>
          )}
        />
        <Route
          exact
          path={"/plants/:id"}
          render={(props) => (
            <>
              <Navbar userStatus={authState} />
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
              <Footer />
            </>
          )}
        />

        <Route
          path="/user/:id"
          render={(props) => (
            <>
              {authState.authenticated ? (
                <>
                  <Navbar userStatus={authState} />
                  <ProfilePage
                    {...props}
                    authStatus={authState}
                    usersPlants={userPlants}
                    retrieveUserData={getUserData}
                    addModalUpdate={addModalChange}
                    deleteModalUpdate={deleteModalChange}
                  />
                  <Footer />
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

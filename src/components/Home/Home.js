import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";

import styled from "styled-components";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background-brand-color);

  section {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    flex-wrap: wrap;
    margin: 20px auto;
  }
`;

const Home = (props) => {
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const Results = props.plantItems.map((item) => (
    <SearchResults
      key={item.id}
      id={item.id}
      image={item.image_url}
      commonName={item.common_name}
      familyCommonName={item.family_common_name}
      authStatus={props.authStatus}
      userPlantList={props.userPlants}
      getUserData={props.getUserData}
    />
  ));

  if (error) {
    setError("error has occurred");
    return <div>Error: {error}</div>;
  } else if (!props.loadingStatus) {
    return <div>Loading...</div>;
  } else {
    return (
      <StyledLayout>
        <SearchForm
          searchTerm={props.search}
          onChange={props.change}
          onSubmit={handleSubmit}
        />
        <section>{Results}</section>
        {!props.search || props.items.length > 19 ? (
          <button onClick={props.newPage}>next page</button>
        ) : (
          ""
        )}
      </StyledLayout>
    );
  }
};

export default Home;

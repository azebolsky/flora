import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import {
  getPlantsWithPageNumber,
  getPlantsWithSearchAndPageNumber,
} from "../../services/api-service";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function fetchData() {
      const data = !search
        ? await getPlantsWithPageNumber(page)
        : await getPlantsWithSearchAndPageNumber(page, search);
      setLoading(true);
      setItems(data.data);
    }
    fetchData();
  }, [page, search]);

  const nextPage = () => {
    let newPage = page;
    setPage((newPage += 1));
  };

  const Results = items.map((item) => (
    <SearchResults
      key={item.id}
      id={item.id}
      image={item.image_url}
      commonName={item.common_name}
      familyCommonName={item.family_common_name}
      authStatus={props.authStatus}
    />
  ));

  if (error) {
    setError("error has occurred");
    return <div>Error: {error}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <StyledLayout>
        <SearchForm
          searchTerm={search}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <section>{Results}</section>
        {!search || items.length > 19 ? (
          <button onClick={nextPage}>next page</button>
        ) : (
          ""
        )}
      </StyledLayout>
    );
  }
};

export default Home;

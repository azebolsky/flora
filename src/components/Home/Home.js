import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import {
  getPlantsWithPageNumber,
  getPlantsWithSearchAndPageNumber,
} from "../../services/api-service";

import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

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

  const clearSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <StyledLayout>
        <SearchForm
          searchTerm={search}
          onChange={handleChange}
          onSubmit={handleSubmit}
          clearSearchInput={clearSearch}
        />
        <SearchResults resultItems={items} pages={nextPage} />
      </StyledLayout>
    );
  }
};

export default Home;

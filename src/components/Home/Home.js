import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import { getPlantsWithPageNumber } from "../../services/api-service";

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
    // const myAbortController = new AbortController();
    let isCancelled = false;
    const searchItems = async () => {
      if (!isCancelled && search) {
        await getPlantsWithPageNumber().then(
          (result) => {
            setLoading(true);
            setItems(result.data);
          },
          (error) => {
            setLoading(true);
            setError(error);
          }
        );
      } else if (!isCancelled) {
        await fetch(
          `https://trefle.io/api/v1/plants?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setLoading(true);
              setItems(result.data);
            },
            (error) => {
              setLoading(true);
              setError(error);
            }
          );
      }
    };
    searchItems();
    return () => {
      isCancelled = true;
      console.log(`line 67===> ${isCancelled}`);
    };
  }, [page, search]);

  const nextPage = () => {
    let newPage = page;
    setPage((newPage += 1));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <SearchForm
          searchTerm={search}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <SearchResults resultItems={items} pages={nextPage} />
      </div>
    );
  }
};

export default Home;

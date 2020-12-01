import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import {
  getPlantsWithPageNumber,
  getPlantsWithSearchAndPageNumber,
} from "../../services/api-service";

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
    // let isCancelled = false;
    async function fetchData() {
      const data = await getPlantsWithPageNumber(page);
      setLoading(true);
      setItems(data.data);
      console.log(data);
    }
    fetchData();
    // const searchItems = () => {
    //   if (!isCancelled && search) {
    //     getPlantsWithSearchAndPageNumber(page, search).then(
    //       (data) => {
    //         console.log(data);
    //         setLoading(true);
    //         setItems(data);
    //       },
    //       (error) => {
    //         setLoading(true);
    //         setError(error);
    //       }
    //     );
    //   } else if (!isCancelled) {
    //     getPlantsWithPageNumber(page).then(
    //       (data) => {
    //         console.log(data);
    //         setLoading(true);
    //         setItems(data);
    //       },
    //       (error) => {
    //         setLoading(true);
    //         setError(error);
    //       }
    //     );
    //   }
    // };
    // searchItems();
    // return () => {
    //   isCancelled = true;
    //   console.log(`line 67===> ${isCancelled}`);
    // };
  }, [page]);

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

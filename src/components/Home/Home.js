import React, { useEffect, useState } from "react";
import SearchForm from "../../SearchForm/SearchForm";

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
    if (search) {
      fetch(
        `https://trefle.io/api/v1/plants/search?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}&q=${search}`
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
    } else {
      fetch(
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
  }, [page, search]);

  const nextPage = () => {
    let newPage = page;
    setPage((newPage += 1));
    console.log(page);
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
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.common_name}
              <img
                src={item.image_url}
                alt="plant"
                width="100px"
                height="auto"
              />
            </li>
          ))}
        </ul>
        <button onClick={nextPage}>next page</button>
      </div>
    );
  }
};

export default Home;

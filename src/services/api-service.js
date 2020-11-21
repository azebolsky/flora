import Home from "../components/Home/Home";

export const getPlantsWithPageNumber = fetch(
  `https://trefle.io/api/v1/plants/search?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}&q=${search}`
).then((res) => res.json());

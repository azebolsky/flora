function getPlantsWithSearchAndPageNumber(page, search) {
  console.log(`page: ${page}, search: ${search}`);

  fetch(
    `https://trefle.io/api/v1/plants/search?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}&q=${search}`
  ).then((res) => res.json());
}

function getPlantsWithPageNumber(page) {
  console.log(`page: ${page}`);
  return fetch(
    `https://trefle.io/api/v1/plants?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}`
  ).then((res) => res.json());
  // .then((data) => console.log(data.data));
}

export { getPlantsWithSearchAndPageNumber, getPlantsWithPageNumber };

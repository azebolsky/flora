function getPlantsWithSearchAndPageNumber(page, search) {
  return fetch(
    `https://trefle.io/api/v1/plants/search?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}&q=${search}`
  ).then((res) => res.json());
}

function getPlantsWithPageNumber(page) {
  return fetch(
    `https://trefle.io/api/v1/plants?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}`
  ).then((res) => res.json());
}

function getSpeciesWithPageNumber(page) {
  return fetch(
    `https://trefle.io/api/v1/species/678281?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}`
  ).then((res) => res.json());
}

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  getSpeciesWithPageNumber,
};

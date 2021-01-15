const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function getPlantsWithSearchAndPageNumber(page, search) {
  const url = `https://trefle.io/api/v1/plants/search?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}&q=${search}`;
  return fetch(proxyUrl + url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function getPlantsWithPageNumber(page) {
  const url = `https://trefle.io/api/v1/plants?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms&page=${page}`;
  return fetch(proxyUrl + url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
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

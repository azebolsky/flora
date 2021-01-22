const API_TOKEN = process.env.REACT_APP_TREFLE_API_KEY;

function getPlantsWithSearchAndPageNumber(page, search) {
  const url = `/api/v1/plants/search?token=${API_TOKEN}&page=${page}&q=${search}`;
  return fetch(url, {
    accept: "application/json",
  }).then((res) => res.json());
}

function getPlantsWithPageNumber(page) {
  const url = `/api/v1/plants?token=${API_TOKEN}&page=${page}`;
  return fetch(url, {
    accept: "application/json",
  }).then((res) => res.json());
}

function getSpeciesWithPageNumber(page) {
  const url = `/api/v1/species/678281?token=${API_TOKEN}&page=${page}`;
  return fetch(url, {
    accept: "application/json",
  }).then((res) => res.json());
}

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  getSpeciesWithPageNumber,
};

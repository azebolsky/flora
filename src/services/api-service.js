const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const API_TOKEN = process.env.REACT_APP_TREFLE_API_KEY;

function getPlantsWithSearchAndPageNumber(page, search) {
  const url = `https://trefle.io/api/v1/plants/search?token=${API_TOKEN}&page=${page}&q=${search}`;
  return fetch(proxyUrl + url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

const getPlantsWithPageNumber = async (page) => {
  const url = `https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=${page}`;
  return await fetch(proxyUrl + url, {
    accept: "application/json",
  }).then((res) => res.json());
};

function getSpeciesWithPageNumber(page) {
  const url = `https://trefle.io/api/v1/species/678281?token=${API_TOKEN}&page=${page}`;
  return fetch(proxyUrl + url, {
    accept: "application/json",
  }).then((res) => res.json());
}

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  getSpeciesWithPageNumber,
};

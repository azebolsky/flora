const API_TOKEN = process.env.REACT_APP_TREFLE_API_KEY;
const proxyUrl = "https://api.allorigins.win/raw?url=";

const getPlantsWithPageNumber = (page) => {
  const url = `https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=${page}`;
  console.log(page);
  return fetch(proxyUrl + url, {
    accept: "application/json",
    "Content-Type": "application/json",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

function getPlantsWithSearchAndPageNumber(page, search) {
  const url = `https://trefle.io/api/v1/plants/search?token=${API_TOKEN}&page=${page}&q=${search}`;
  return fetch(proxyUrl + url, {
    accept: "application/json",
    "Content-Type": "application/json",
  }).then((res) => res.json());
}

function getSpeciesWithPageNumber(page) {
  const url = `https://trefle.io/api/v1/species/678281?token=${API_TOKEN}&page=${page}`;
  return fetch(proxyUrl + url).then((res) => res.json());
}

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  getSpeciesWithPageNumber,
};

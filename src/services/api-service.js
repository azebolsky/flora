const API_TOKEN = process.env.REACT_APP_TREFLE_API_KEY;
const proxyUrl = "https://git.heroku.com/secure-sands-98829.git/";
const BASE_URL = "/plants";

const getPlantsWithPageNumber = (page) => {
  console.log("line 24");
  console.log(page);
  return fetch(BASE_URL)
    .then((res) => res.json())
    .catch((error) => console.log("error line 9: " + error));
};

function getPlantsWithSearchAndPageNumber(page, search) {
  const url = `https://trefle.io/api/v1/plants/search?token=${API_TOKEN}&page=${page}&q=${search}`;
  console.log(url);
  return fetch(proxyUrl + url, {
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
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

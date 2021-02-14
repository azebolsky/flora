const API_TOKEN = process.env.TREFLE_API_KEY;
const BASE_URL = "/api/plants";

const getPlantsWithPageNumber = (page) => {
  console.log("line 6");
  return fetch(BASE_URL)
    .then((res) => res.json())
    .catch((error) => console.log("error line 9: " + error));
};

function getPlantsWithSearchAndPageNumber(page, search) {
  const url = `https://trefle.io/api/v1/plants/search?token=${API_TOKEN}&page=${page}&q=${search}`;
  return fetch(url).then((res) => res.json());
}

// function getSpeciesWithPageNumber(page) {
//   const url = `https://trefle.io/api/v1/species/678281?token=${API_TOKEN}&page=${page}`;
//   return fetch(proxyUrl + url).then((res) => res.json());
// }

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  // getSpeciesWithPageNumber,
};

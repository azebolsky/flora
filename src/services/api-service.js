const BASE_URL = "/api/plants";

const getPlantsWithPageNumber = (page) => {
  console.log("line 6");
  return fetch(BASE_URL + `/?page=${page}`)
    .then((res) => res.json())
    .catch((error) => console.log("error line 9: " + error));
};

function getPlantsWithSearchAndPageNumber(page, search) {
  return fetch(BASE_URL + `/search?page=${page}&search=${search}`)
    .then((res) => res.json())
    .catch((error) => console.log("error line 14: " + error));
}

export { getPlantsWithSearchAndPageNumber, getPlantsWithPageNumber };

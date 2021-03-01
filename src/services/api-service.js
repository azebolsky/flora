const BASE_URL = "/api/plants";

const getPlantsWithPageNumber = (page) => {
  console.log("hey from api-service");
  return fetch(BASE_URL + `/?page=${page}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const getPlantsWithSearchAndPageNumber = (page, search) => {
  return fetch(BASE_URL + `/search?page=${page}&search=${search}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const getIndividualPlant = (id) => {
  console.log("hey from one plant service");
  return fetch(BASE_URL + `/${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  getIndividualPlant,
};

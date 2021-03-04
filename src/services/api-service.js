const BASE_URL = "/api/plants";
const BASE_URL_2 = "/api/plantsFilter";

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

const familyFilter = (family) => {
  console.log("hey from one filter service");
  return fetch(BASE_URL_2 + `/?filter[family_common_name]=${family}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export {
  getPlantsWithSearchAndPageNumber,
  getPlantsWithPageNumber,
  getIndividualPlant,
  familyFilter,
};

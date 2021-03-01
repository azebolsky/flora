const BASE_URL = "/api/plants";

const getIndividualPlant = (id) => {
  console.log("hey from one plant service");
  return fetch(BASE_URL + `/?id=${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export { getIndividualPlant };

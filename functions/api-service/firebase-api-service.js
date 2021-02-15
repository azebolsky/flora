const BASE_URL = "/api/plants";

const getFirePlantsWithPageNumber = (page) => {
  console.log("firebase-api-service");
  return fetch(BASE_URL)
    .then((res) => res.json())
    .catch((error) => console.log("error line 9: " + error));
};

export { getFirePlantsWithPageNumber };

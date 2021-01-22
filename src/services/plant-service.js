// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const API_TOKEN = process.env.REACT_APP_TREFLE_API_KEY;

function getIndividualPlant(id) {
  const url = `/api/v1/plants/${id}?token=${API_TOKEN}`;
  return fetch(url, {
    accept: "application/json",
  }).then((res) => res.json());
}

export { getIndividualPlant };

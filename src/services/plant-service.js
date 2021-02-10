const proxyUrl = "https://api.allorigins.win/raw?url=";
// "proxy": "https://trefle.io",

const API_TOKEN = process.env.REACT_APP_TREFLE_API_KEY;

function getIndividualPlant(id) {
  const url = `https://trefle.io/api/v1/plants/${id}?token=${API_TOKEN}`;
  return fetch(proxyUrl + url, {
    accept: "application/json",
  }).then((res) => res.json());
}

export { getIndividualPlant };

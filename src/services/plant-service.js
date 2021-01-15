const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function getIndividualPlant(id) {
  const url = `https://trefle.io/api/v1/plants/${id}?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms`;
  return fetch(proxyUrl + url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export { getIndividualPlant };

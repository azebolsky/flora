function getIndividualPlant(id) {
  return fetch(
    `https://trefle.io/api/v1/plants/${id}?token=ga9sPW6MBa8FDVSkKSWemxEqUJvgbKRNRiVYCSLZBms`
  ).then((res) => res.json());
}

export { getIndividualPlant };

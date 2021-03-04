const BASE_URL = "/api/plants";

const familyFilter = (family) => {
  console.log("hey from one filter service");
  // const familyFixed = family.split(" ").join("%20");
  // console.log(familyFixed);
  return fetch(BASE_URL + `/?filter[family_common_name]=${family}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export { familyFilter };

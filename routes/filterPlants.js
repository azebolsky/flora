const express = require("express");
const router = express.Router();
const request = require("request");
const API_TOKEN = process.env.TREFLE_API_KEY;

router.get("/", (req, res) => {
  console.log("hey from filterPlants route");
  const value = req.query.filter.family_common_name;
  console.log(value);
  request(
    `https://trefle.io/api/v1/plants?token=${API_TOKEN}&filter[family_common_name]=${value}`,
    function (error, response, body) {
      res.json(body);
    }
  );
});

module.exports = router;

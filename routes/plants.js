const express = require("express");
const router = express.Router();
const request = require("request");
const API_TOKEN = process.env.TREFLE_API_KEY;

router.get("/", (req, res) => {
  console.log("hey from plants route");
  const currentPage = req.query.page;
  request(
    `https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=${currentPage}`,
    function (error, response, body) {
      res.json(body);
    }
  );
});

router.get("/search", (req, res) => {
  const currentPage = req.query.page;
  const currentSearch = req.query.search;
  request(
    `https://trefle.io/api/v1/plants/search?token=${API_TOKEN}&page=${currentPage}&q=${currentSearch}`,
    function (error, response, body) {
      res.json(body);
    }
  );
});

module.exports = router;

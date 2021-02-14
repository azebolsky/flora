const express = require("express");
const router = express.Router();
const request = require("request");
const API_TOKEN = process.env.TREFLE_API_KEY;

router.get("/", (req, res) => {
  // const page = req.query.page;
  // console.log(page);
  console.log("heyyyy");
  request(
    `https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=1`,
    function (error, response, body) {
      res.json(body);
    }
  );
});

module.exports = router;

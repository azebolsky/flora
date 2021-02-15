const functions = require("firebase-functions");
const express = require("express");
const app = express();
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

exports.plants = functions.https.onRequest(app);
module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const request = require("request");
const functions = require("firebase-functions");
require("dotenv").config();
const API_TOKEN = process.env.TREFLE_API_KEY;

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  request(
    `https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=1`,
    function (error, response, body) {
      res.json(body);
    }
  );
});

exports.app = functions.https.onRequest(app);

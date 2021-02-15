const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allows us to listen to when a user sends a request

// app.get("/", (request, response) => {
//   response.send("Cache-Control", "public, max-age=300, s-max-age=600");
//   response.send(`${Date.now()}`);
// });

const plantsRouter = require("./routes/firebase-plants");
app.use("/api/plants", plantsRouter);

module.exports = app;

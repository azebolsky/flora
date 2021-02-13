const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const plantsRouter = require("./routes/plants");
app.use("/plants", plantsRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});

module.exports = app;

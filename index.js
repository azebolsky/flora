const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

const plantsRouter = require("./routes/plants");
const filterPlantsRouter = require("./routes/filterPlants");
app.use("/api/plants", plantsRouter);
app.use("/api/plantsFilter", filterPlantsRouter);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// }

app.listen(port, function () {
  console.log("Runnning on " + port);
});

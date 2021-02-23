const express = require("express");
// import * as functions from "firebase-functions";
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();
// import getPlants from "./routes/plants";

const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const plantsRouter = require("./routes/plants");
app.use("/api/plants", plantsRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});

// app.get("**", (req, res) => {
//   console.log("heyyyyyyyyyyyyy");
//   getPlants().then((plants) => {
//     const data = renderToString(plants);
//     res.send(data);
//   });
// });

// export let api = functions.https.onRequest(app);

module.exports = app;

"use strict";
require("dotenv").config();
const log = console.log;
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { mongoose } = require("./db/mongoose");

const app = express();

app.use(upload.single("xml"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

/* Routes from router */
const patientRoutes = require("./routes/patient");
const formRoutes = require("./routes/form");
const accountRoutes = require("./routes/account");
/* Routes from router end */

app.use(bodyParser.json());

/* Server Resource Routes */
app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/form", formRoutes);
app.use("/api/v1/account", accountRoutes);
/* Server Resource Routes End */

/* Frontend Resource Routes */
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
/* Frontend Resource Routes End */

const port = process.env.PORT || 3001;
app.listen(port, () => {
  log(
    `Server is running on port: ${port}... \n For development use http://localhost:${port}/ \n For API use http://localhost:${port}/api/v1/`
  );
});

module.exports = app;

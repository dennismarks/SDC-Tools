const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
const url = process.env.ATLAS_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const patientRoutes = require("./routes/patient");

// Server resource routes
app.use("/patient", patientRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

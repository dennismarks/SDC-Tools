const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const url = process.env.ATLAS_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

/* Routes from router */
const patientRoutes = require("./routes/patient");
const formRoutes = require("./routes/form");
/* Routes from router end */

/* Server Resource Routes */
app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/", formRoutes);
/* Server Resource Routes End */

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(
    `Server is running on port: ${port}... \n For development use http://localhost:${port}`
  );
});

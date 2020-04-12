const mongoose = require("mongoose");

/* Connecting to database */
/* Either URI or env variable on deployment. */
const mongoURI = process.env.ATLAS_URI;

mongoose
  .connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    function (error) {
      if (error) console.log(error);
    }
  )
  .catch((error) => console.log(error));

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = { mongoose };

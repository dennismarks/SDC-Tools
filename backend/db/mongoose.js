const mongoose = require("mongoose");

/* Connecting to database */
/* Either URI or env variable on deployment. */
const mongoURI =
  "mongodb://user:csc302@cluster0-shard-00-00-29vno.mongodb.net:27017,cluster0-shard-00-01-29vno.mongodb.net:27017,cluster0-shard-00-02-29vno.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    function(error) {
      if (error) console.log(error);

      console.log("MongoConnection successful");
    }
  )
  .catch(error => console.log(error));

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = { mongoose };

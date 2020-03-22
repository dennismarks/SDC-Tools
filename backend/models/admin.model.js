const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    allForms: []
  },
  { collection: "admin" }
);

module.exports = mongoose.model("admin", AdminSchema);

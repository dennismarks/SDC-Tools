const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema(
  {
    allForms: []
  },
  { collection: "admin" } //Specify collection
);

module.exports = mongoose.model("template", TemplateSchema);

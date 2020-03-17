const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  firstName: String
});

module.exports = mongoose.model("template", TemplateSchema);

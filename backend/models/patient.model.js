const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    patientID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    relatedForms: {
      type: [
        new Schema({
          filler: String,
          formID: String,
          //TODO: might need to have timestamp: "filled out 2 days ago"
        }),
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patient", PatientSchema);

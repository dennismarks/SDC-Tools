const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    patient_number: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("patient", PatientSchema);

const router = require("express").Router();
let Patient = require("../models/patient.model");

// Get all patients
router.route("/").get((req, res) => {
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json("Error: " + err));
});

// Read
router.route("/:id").get((req, res) => {
  Patient.findOne({ patient_number: req.params.id })
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json("Error: " + err));
});

// Create
router.route("/add").post((req, res) => {
  const { patient_number, name, email, phone } = req.body;
  const newPatient = new Patient({ patient_number, name, email, phone });
  newPatient
    .save()
    .then(() => res.json("Patient added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// Update
router.route("/update/:id").post((req, res) => {
  Patient.findById(req.params.id)
    .then(patient => {
      const { patient_number, name, email, phone } = req.body;
      patient.patient_number = patient_number;
      patient.name = name;
      patient.email = email;
      patient.phone = phone;

      patient
        .save()
        .then(() => res.json("Patient updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// Delete
router.route("/:id").delete((req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(() => res.json("Patient deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

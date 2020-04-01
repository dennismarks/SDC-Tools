const router = require("express").Router();
let Patient = require("../models/patient.model");
let Form = require("../models/form.model");

// Get all patients
router.route("/").get((req, res) => {
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json("Error: " + err));
});

// Read

router.route("/form_query/:id").get((req, res) => {
  Patient.findOne({ patient_number: req.params.id }, function(err, patient){
    array_of_diagnosticID = patient.historical_form
    length_array = array_of_diagnosticID.length
    counter = 0
    const array = []
  
    array_of_diagnosticID.forEach(dID   => {
      Form.findOne({ diagnosticID: dID }, function(err, product){
      array.push(product)
      counter += 1
      if (counter == length_array){
        res.json(array)
      }
      })
    });


  })
});

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

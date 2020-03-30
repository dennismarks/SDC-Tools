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
// router.route("/:id").get((req, res) => {
//   Patient.findOne({ patient_number: req.params.id })
//     .then(patient => {
      
//       forms_objectId = patient.historical_form
//       array_of_objectID = forms_objectId.toString().split(",")
//       console.log(array_of_objectID)
//       var array = []
//       array_of_objectID.forEach(form_id => {
//         Form.findById(form_id, function(err, product){
//           console.log(product)
//           array.push(product)
//           console.log(array)
//         })
//       });
//       console.log(array)
      
//     }).catch(err => {
//     });
// });

router.route("/:id").get((req, res) => {
  Patient.findOne({ patient_number: req.params.id }, function(err, patient){
    console.log(patient)
    forms_objectId = patient.historical_form
    array_of_objectID = forms_objectId.toString().split(",")
    length = array_of_objectID.length
    console.log(array_of_objectID)
    var array = []
  
    array_of_objectID.forEach(form_id => {
      Form.findById(form_id, function(err, product){
        array.push(product)
        console.log(array)
      })
    })

   console.log("why this code run first" + array.toString())

   res.json(array)
  })
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

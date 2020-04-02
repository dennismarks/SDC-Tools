const router = require("express").Router();
let admin = require("../models/admin.model");
let form = require("../models/form.model");

// Post new XML to be processed
router.route("/xml").post((req, res) => {
  res
    .status(200)
    .json({ question1: "What is your name", question2: "How are you feeling" });
});

// Get all available fillout forms
router.route("/").get((req, res) => {
  try {
    admin.findOne().then(data => {
      res.json({
        allForms: data["allForms"]
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get fillout form specifically @formID
router.route("/GET/:formID").get((req, res) => {
  try {
    form.findOne({ formID: req.params.formID }).then(data => {
      res.json(data);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

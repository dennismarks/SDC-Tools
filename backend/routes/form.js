const router = require("express").Router();
let admin = require("../models/admin.model");

// Post new XML to be processed
router.route("/xml").post((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
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
router.route("/:formID").get((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

module.exports = router;

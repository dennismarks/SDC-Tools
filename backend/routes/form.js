const router = require("express").Router();
let admin = require("../models/admin.model");

// Post new XML to be processed
router.route("/form").post((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

// Get all available fillout forms
// router.route("/fillout").get((req, res) => {
//   res.status(200).json({
//     filloutForms: {
//       "0": "Heart Form",
//       "1": "Brain Form",
//       "2": "Body Form",
//       "3": "Final Form"
//     },
//     allForms: [0, 1, 2, 3, 4, 5]
//   });
// });

// Get all available fillout forms
router.route("/fillout").get((req, res) => {
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
router.route("/fillout/:formID").post((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

router.route("/account/:accountID").get((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

router.route("/account/save").post((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

module.exports = router;

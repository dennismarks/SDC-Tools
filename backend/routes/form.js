const router = require("express").Router();
// let form = require("../models/form.model");

// takes in XML MOCK ENDPOINT !!
router.route("/form").post((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

router.route("/fillout").get((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

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

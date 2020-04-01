const router = require("express").Router();
// let account = require("../models/account.model");

router.route("/:accountID").get((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

router.route("/save").post((req, res) => {
  res.status(200).send(
    JSON.stringify({
      "1. What is your name": "<1>",
      "2. How are you feeling": "<2>"
    })
  );
});

module.exports = router;

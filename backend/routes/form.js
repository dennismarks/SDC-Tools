const router = require("express").Router();
const admin = require("../models/admin.model");
const form = require("../models/form.model");
const parser = require("../XML/xmlParser.js");
const fs = require("fs");

// Post new XML to be processed
router.route("/import").post((req, res) => {
  // Take in XML

  fs.readFile(req.file.path, { encoding: "utf-8" }, function(e, file) {
    if (!e) {
      parser.xmlParse(file).then(data => {
        // upload to Atlas
        form.collection
          .insertOne(data)
          .then(x => {
            admin.findOneAndUpdate({}, { new: true }, (err, re) => {
              re["allForms"].push({
                formID: x.ops[0].formID,
                formTitle: x.ops[0].formTitle
              });
              re.save();
              res.status(200).send(re["allForms"]);
            });
            // Return newly parsed data
          })
          .catch(e => res.status(409).send(e.message));
      });
    } else {
      res.status(500).send(e);
    }
  });
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
    res.status(404).send(error.message);
  }
});

// Get fillout form specifically @formID
router.route("/GET/:formID").get((req, res) => {
  try {
    form.findOne({ formID: req.params.formID }).then(data => {
      res.json(data);
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

const router = require("express").Router();
const admin = require("../models/admin.model");
const form = require("../models/form.model");
const parser = require("../XML/xmlParser.js");
const fs = require("fs");

// Post new XML to be processed
router.route("/import").post((req, res) => {
  // Take in XML

  // Check for duplicates + version differences
  let checks = false;

  try {
    form
      .findOne({ formID: req.body.formID, version: req.body.version })
      .then(duplicate => {
        checks = duplicate ? false : true;
        if (checks) {
          // Process XML

          fs.readFile(req.file.path, { encoding: "utf-8" }, function(e, file) {
            if (!e) {
              parser.xmlParse(file).then(data => {
                // upload to Atlas
                try {
                  form.collection.insertOne(data).then(x => {
                    form
                      .findOne({
                        formID: req.body.formID
                      })
                      .then(data => res.status(200).send(data));
                  });
                } catch (error) {
                  res.status(505).send(error.message);
                }
              });
            } else {
              console.log(e);
            }
          });
        } else {
          res.status(409).send(`Conflict found in Server: did not pass checks`);
        }
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
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

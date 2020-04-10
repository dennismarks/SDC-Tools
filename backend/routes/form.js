const router = require("express").Router();
const admin = require("../models/admin.model");
const form = require("../models/form.model");
const parser = require("../XML/xmlParser.js");
const fs = require("fs");
const log = console.log;

router.route("/save").post((req, res) => {});

// Post new XML to be processed
router.route("/import").post((req, res) => {
  // Take in XML

  fs.readFile(req.file.path, { encoding: "utf-8" }, function (e, file) {
    if (!e) {
      parser.xmlParse(file).then((data) => {
        // upload to Atlas
        form.collection
          .insertOne(data)
          .then((x) => {
            admin.findOneAndUpdate({}, { new: true }, (err, re) => {
              re["allForms"].push({
                formID: x.ops[0].formID,
                formTitle: x.ops[0].formTitle,
              });
              re.save();
              res.status(200).send(re["allForms"]);
            });
            // Return newly parsed data
          })
          .catch((e) => res.status(409).send(e.message));
      });
    } else {
      res.status(500).send(e);
    }
  });
});

// Get all available fillout forms
router.route("/").get((req, res) => {
  admin
    .findOne()
    .then((data) => {
      res.json({
        allForms: data["allForms"],
      });
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

function hash(data) {
  //TODO: consider adding salt
  return new Promise((res, rej) => {
    res(require("crypto").createHash("md5").update(data).digest("hex"));
  });
}

// Get draft form specifically @formID @patientID
router.route("/GET/:formID/:patientID").get((req, res) => {
  form
    .findOne({ formID: req.params.formID })
    .then((data) => {
      hash(req.params.formID.concat(req.params.patientID, data.version)).then(
        (diag) => {
          const newDraft = data.toObject();
          newDraft.diagnosticID = diag; // Generating diagnosticID for new Draft
          res.json(newDraft);
        }
      );
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

// Get fillable form specifically @formID
router.route("/GET/:formID").get((req, res) => {
  form
    .findOne({ formID: req.params.formID })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

router.route("/save").post((req, res) => {});

module.exports = router;

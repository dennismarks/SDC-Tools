const router = require("express").Router();
const admin = require("../models/admin.model");
const form = require("../models/form.model");
const draft = require("../models/draft.model");
const patient = require("../models/patient.model");

const parser = require("../XML/xmlParser.js");
const fs = require("fs");
const log = console.log;
const CryptoJS = require("crypto-js");

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
              re.allForms.push({
                formID: data.formID,
                formTitle: data.formTitle,
              });
              re.save();
              res.status(200).send(re["allForms"]);
            });
          })
          .catch((e) => res.status(409).send(e.message));
      });
    } else {
      res.status(500).send(e);
    }
  });
});

router.route("/remove/:formID").delete((req, res) => {
  form.deleteOne({ formID: req.params.formID }).then((re) => {
    res.status(200).send(`removed form - ${req.params.formID}`);
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

function cryptEn(data) {
  return new Promise((res, rej) => {
    res(CryptoJS.AES.encrypt(data, "secret").toString());
  });
}

function cryptDe(encrypted) {
  return new Promise((res, rej) => {
    res(CryptoJS.AES.decrypt(encrypted, "secret").toString(CryptoJS.enc.Utf8));
  });
}

// Get draft form specifically @formID @patientID
router.route("/GET/:formID/:patientID").get((req, res) => {
  form
    .findOne({ formID: req.params.formID })
    .then((data) => {
      cryptEn(
        req.params.formID.concat(data.version, req.params.patientID)
      ).then((diag) => {
        const newDraft = data.toObject();
        newDraft.diagnosticID = diag; // Generating diagnosticID for new Draft
        res.json(newDraft);
      });
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

router.route("/save").post((req, res) => {
  draft.collection
    .insertOne(req.body.payload)
    .then((data) => {
      if (data.insertedCount !== 1) {
        res.status(404).send("Unable to insert document to database");
      }

      cryptDe(req.body.payload.diagnosticID).then((decrypted) => {
        // Append to patient profile
        const patientID = decrypted.slice(-1);
        //TODO: patient_number deprecated need to change to patientID
        patient.findOneAndUpdate(
          { patient_number: patientID },
          { new: true },
          (err, re) => {
            //TODO: relatedForms not historical
            // re.historical_form.push(req.body.payload.diagnosticID)
            re.historical_form.push(5);
            re.save();
            res.status(200).send("added draft to patient profile");
          }
        );
      });
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
});

module.exports = router;

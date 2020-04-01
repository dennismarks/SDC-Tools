const fs = require("fs"),
  xml2js = require("xml2js"),
  log = console.log;

let SDCPackage_Metadata,
  XMLPackage_Metadata,
  XMLPackage_FormDesign,
  XMLPackage_Property_U,
  XMLPackage_Property,
  XMLPackage_Body_U,
  XMLPackage_Body,
  XMLPackage_Body_Metadata,
  XMLPackage_Body_ChildItems,
  XMLPackage_Body_ChildItems_Metadata,
  XMLPackage_Body_ChildItems_Section,
  XMLPackage_Body_ChildItems_Comment,
  XMLPackage_Footer_U,
  XMLPackage_Footer,
  XMLPackage_Footer_Metadata,
  XMLPackage_Footer_Property_U,
  XMLPackage_Footer_Property;

var parser = new xml2js.Parser({explicitArray : false});
fs.readFile(__dirname + "/source/1.xml", function(err, data) {
  parser.parseString(data, function(err, result) {
    //TODO: check to see if we need this data.
    // SDCPackage_Metadata = result.SDCPackage.$;

    if (json.SDCPackage.XMLPackage[0].FormDesign) {
      XMLPackage_FormDesign = json.SDCPackage.XMLPackage[0].FormDesign;
    } else {
      XMLPackage_FormDesign = json.FormDesign;
    }

    XMLPackage_FormDesign = result.SDCPackage.XMLPackage[0].FormDesign;

    XMLPackage_Metadata = XMLPackage_FormDesign[0].$;

    XMLPackage_Property_U = XMLPackage_FormDesign[0].Property;

    XMLPackage_Property = XMLPackage_Property_U.map(x => x.$);

    // ###################   BODY    ###################
    XMLPackage_Body_U = XMLPackage_FormDesign[0].Body;

    XMLPackage_Body_Metadata = XMLPackage_Body_U[0].$;

    XMLPackage_Body_ChildItems = XMLPackage_Body_U[0].ChildItems;

    // ^^^^^^^^^^^^^^^^^^^   BODY    ^^^^^^^^^^^^^^^^^^^^

    // ###################   FOOTER    ###################
    XMLPackage_Footer_U = XMLPackage_FormDesign[0].Footer;

    XMLPackage_Footer_Metadata = XMLPackage_Footer_U[0].$;

    XMLPackage_Footer_Property_U = XMLPackage_Footer_U[0].Property;

    XMLPackage_Footer_Property = XMLPackage_Footer_Property_U.map(x => x.$);

    // ^^^^^^^^^^^^^^^^^^^   FOOTER   ^^^^^^^^^^^^^^^^^^^^

    log(JSON.stringify(result));
  });
});

function extractMetadata(FormDesign){
  return FormDesign.Property;
}
/*
This function extracts questions from the raw json from xml2js.
json: string
returns list of json of questions
example [Question1, question2, [question4, [question5, question6]], question3]

*/
function extractSections(sections) {
  const reQuestions = [];
  let qID = 0;

  for (let i = 0; i < sections.length; i++){

    let ListQuestions = sections[i].ChildItems[0].Question;
    let ListSections = sections[i].ChildItems[0].Section;
    if (ListQuestions != null) {

      let qs = ListQuestions.map(q =>
        parsingQuestion(q));




      reQuestions.push(qs);
    } else if (ListSections) {
      reQuestions.push(extractQuestions(ListSections));
    }
  }
  return reQuestions;
}

function parsingQuestion(question, qID,){
/*
{
  "$": {
    "name": "Q_77894",
    "ID": "77894.100004300",
    "title": "Clinical History:"
  },
  "ResponseField": [
    {
      "$": { "name": "rf_77894_1" },
      "Response": [
        {
          "$": { "name": "rsp_77894_2" },
          "string": [
            { "$": { "name": "str_77894_3" } }
          ]
        }
      ]
    }
  ]
}

{
  questionID: "77894.100004300"
  questionTitle: "Clinical History:",
  dependentQuestions: ["xxx", "yyy"],
  questionBody: null,
  answerType: 0,
  answerObject: {questionID: "77894.100004300", answer: null}
}
*/
  let questionID, questionTitle, questionText, dependentQuestions, questionBody, answerType, answerObject;
  questionID = question.$.ID;
  questionTitle = question.$.title;
  questionText = null;
  if (question.Property){
    questionText = question.Property.$.val;
  }


  dependentQuestions = [];
  if (question.ListField) { // this is a multiple choice question
    let options = question.ListField.List.ListItem.map(item => ({optionID: item.$.ID, value: item.$.title}));
    if (question.ListField.$.maxSelections) {
      questionBody = {is_radio: false, is_checkbox: true, options: options};
      answerType = 3;
    } else {
      questionBody = {is_radio: true, is_checkbox: false, options: options};
      answerType = 2
    }
  } else if (question.ResponseField) {
    questionBody = null;
    answerType = 0;
  }
  // If ResponseField then text only, If ListField then multiple choice
  answerObject = {questionID, answer: null};
  return {
    questionID,
    questionTitle,
    questionText,
    dependentQuestions: setDependentQuestions(question),
    questionBody,
    answerType,
    answerObject,
  };
}
{"1": [2], "2": [4], 4: []}
{"1": {}, "2": {}, "4": {}}

function setDependentQuestions(question) {
  if (!question.ChildItems){
    return [];
  } else {
    question.
  }

}
/*
This function takes in a question json and returns question type
*/
function getAnswerType(question) {}

function buildSchema() {}

log(
  JSON.stringify({
    Footer: [
      { metadata: XMLPackage_Footer_Metadata },
      { Property: XMLPackage_Footer_Property }
    ]
  })
);

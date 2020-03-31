const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true
  },
  answer: Schema.Types.Mixed // For multiple choice, this would be the chosen option id as a string
});

const MultipleChoiceOption = new Schema({
  optionID: {
    type: Number,
    required: true,
    unique: true
  },
  value: Schema.Types.Mixed
});

const MultipleChoiceBodySchema = new Schema({
  is_radio: { type: Boolean, default: false },
  is_checkbox: { type: Boolean, default: false },
  options: [MultipleChoiceOption]
});

const QuestionSchema = new Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true
  },
  questionTitle: String,
  questionText: String,
  dependentQuestions: [this],
  controlQuestion: this,
  // Since currently only multiple choice needs an extra schema for the question
  // body, we do not need to create a schema collection or use a discriminator
  questionBody: MultipleChoiceBodySchema,
  answerType: {
    type: Number // 0 - Text; 1 - Integer; 2 - MultipleChoiceRadio; 3 - MultipleChoiceCheckbox; 4 - T/F
  }
});

const SectionSchema = new Schema({
  sectionID: {
    type: Number,
    required: true,
    unique: true
  },
  sectionTitle: {
    type: String,
    required: true
  },
  subSections: [this],
  questions: [QuestionSchema]
});

const FormSchema = new Schema(
  {
    formID: {
      type: Number,
      required: true,
      unique: true
    },
    diagnosticID: {
      type: Number,
      required: true,
      unique: true
    },
    version: String,
    originalFile: {
      type: String,
      required: true
    },
    property: [new Schema({ name: String, type: String, val: String })],
    note: String,
    sections: [SectionSchema],
    comment: QuestionSchema,
    copyrightFooter: String
  },
  { collection: "fillouts" }
);

module.exports = mongoose.model("form", FormSchema);

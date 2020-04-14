const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  questionID: {
    type: String,
    required: true,
  },
  answer: Schema.Types.Mixed, // For multiple choice, this would be the chosen option id as a string
});

const MultipleChoiceOption = new Schema({
  optionID: {
    type: String,
    required: true,
  },
  value: Schema.Types.Mixed,
  moreInfo: Boolean,
  responseField: String,
});

const MultipleChoiceBodySchema = new Schema({
  is_radio: { type: Boolean, default: false },
  is_checkbox: { type: Boolean, default: false },
  options: [MultipleChoiceOption],
});

const QuestionSchema = new Schema({
  questionID: {
    type: String,
    required: true,
  },
  questionTitle: String,
  questionText: String,
  dependentQuestions: [this],
  // Since currently only multiple choice needs an extra schema for the question
  // body, we do not need to create a schema collection or use a discriminator
  questionBody: MultipleChoiceBodySchema,
  answerType: {
    type: Number, // 0 - Text; 1 - Integer; 2 - MultipleChoiceRadio; 3 - MultipleChoiceCheckbox; 4 - T/F
  },
  answerObject: AnswerSchema,
});

const SectionSchema = new Schema({
  sectionID: {
    type: String,
    required: true,
  },
  sectionTitle: {
    type: String,
    required: true,
  },
  subSections: [this],
  questions: [QuestionSchema],
});

const DraftSchema = new Schema(
  {
    formID: {
      type: String,
      required: true,
      unique: true,
    },
    formTitle: {
      type: String,
      required: true,
    },
    diagnosticID: {
      type: String,
    },
    version: String,
    originalFile: {
      type: String,
      required: true,
    },
    property: [new Schema({ name: String, value: String })],
    note: String,
    sections: [SectionSchema],
    comment: QuestionSchema,
    copyrightFooter: String,
  },
  { collection: "drafts" }
);

module.exports = mongoose.model("drafts", DraftSchema);

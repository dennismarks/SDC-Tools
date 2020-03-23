const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true
  },
  answer: String // All strings can be convert to option.
});

const QuestionSchema = new Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true
  },
  questionTitle: String,
  enableState: Boolean,
  dependentQuestions: [QuestionSchema],
  answerType: {
    type: Number // 0 - Text (or Integer); 1 - MultipleChoice; 2 - T/F
  },
  answerObject: AnswerSchema
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
  questions: [QuestionSchema]
});

const FormSchema = new Schema(
  {
    formID: {
      type: Number,
      required: true,
      unique: true
    },
    diagnostic_id: {
      type: Number,
      required: true,
      unique: true
    },
    sections: [SectionSchema]
  },
  { collection: "fillouts" }
);

module.exports = mongoose.model("form", FormSchema);

import React, { Component } from "react";
import SDCSection from "../components/SDCSection";
import axios from "axios";

export default class DraftPage extends Component {
  constructor(props) {
    super(props);

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.findQuestionAndUpdate = this.findQuestionAndUpdate.bind(this);
    this.saveDraft = this.saveDraft.bind(this);

    // draft is not in this.state because we don't need the draft component to re-render
    // every time we update the answers - sub components take care of the re-rendering
    this.draft = null;

    this.state = {
      fetchError: null,
    };
  }

  handleChange(value, questionID) {
    if (this.draft === null) {
      return;
    }

    this.draft.sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (this.findQuestionAndUpdate(question, questionID, value)) {
          return;
        }
      });
    });
  }

  findQuestionAndUpdate(question, questionID, value) {
    if (question.questionID === questionID) {
      question.answerObject.answer = value;
      return true;
    }

    question.dependentQuestions.forEach((dependentQuestion, i) => {
      if (this.findQuestion(dependentQuestion, questionID, value)) {
        return true;
      }
    });

    return false;
  }

  saveDraft() {
    // API call to save the json into database
    if (this.draft === null) {
      return null;
    }

    axios({
      method: "post",
      url: "http://localhost:3001/api/v1/form/draft/save",
      data: this.draft,
      json: true,
    })
      .then(function (response) {
        alert("Form saved successfully!");
      })
      .catch(function (response) {
        alert("Sorry, failed to save form, an error occurred.\n" + response);
      });

    return;
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/form/draft/get/${this.props.match.params.diagnosticID}`,
      responseType: "application/json",
    })
      .then((response) => {
        this.draft = response.data;
        this.forceUpdate(); // Force render so that the form is displayed
      })
      .catch((error) => {
        this.setState({
          fetchError: true,
          error: error,
        });
      });
  }

  render() {
    if (this.state.fetchError) {
      return (
        <div className="draft-page">
          <div className="App-header">
            <h5>Sorry, an error has occured. Please try reloading the page.</h5>
            <br />
            {this.state.fetchError}
          </div>
        </div>
      );
    }

    if (this.draft === null) {
      return null;
    }

    let sections = [];

    this.draft.sections.forEach((section) => {
      sections.push(
        <SDCSection section={section} onChange={this.handleChange} />
      );
    });

    const formStyle = {
      marginTop: "80px",
      marginLeft: "5%",
      marginRight: "5%",
      maringBottom: "30px",
      backgroundColor: "#282c34",
      width: "90%",
    };

    const saveButtonStyle = {
      position: "fixed",
      bottom: "38px",
      right: "5%",
      marginRight: "17px",
      width: "8%",
      minWidth: "60px",
      borderRadius: "5px",
      borderWidth: "5px",
      backgroundColor: "#e8b91e",
      outline: "none",
      fontWeight: "500",
    };

    return (
      <div className="draft-page">
        <div className="App-header">
          <div style={formStyle}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2>{this.draft.formTitle}</h2>
              <h7>Version {this.draft.version}</h7>
            </div>
            {sections}
          </div>
          <button style={saveButtonStyle} onClick={this.saveDraft}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

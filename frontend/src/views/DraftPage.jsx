import React, { Component } from "react";
import SDCSection from "../components/SDCSection";
import axios from "axios";
import styled from "styled-components/macro";

const MainTitle = styled.div`
  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 52px;
    line-height: 55px;
    color: #ffffff;
  }
  h7 {
    font-family: Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    color: #e7eff6;
    margin-top: 5px;
  }
`;

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
      url: `http://localhost:3001/api/v1/form/get/${this.props.match.params.form_id}/${this.props.match.params.patient_id}`,
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
      width: "1200px",
      margin: "100px auto 200px auto",
    };

    const saveButtonStyle = {
      position: "fixed",
      bottom: "38px",
      right: "5%",
      width: "125px",
      height: "50px",
      borderColor: "#E59C63",
      borderRadius: "8px",
      backgroundColor: "#E59C63",
      outline: "none",
      fontWeight: "bold",
      fontSize: "20px",
      color: "white",
      textTransform: "uppercase",
    };

    return (
      <div className="draft-page">
        <div className="App-header">
          <div style={formStyle}>
            <MainTitle>
              <h1>{this.draft.formTitle}</h1>
              <h7>Version {this.draft.version}</h7>
            </MainTitle>
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

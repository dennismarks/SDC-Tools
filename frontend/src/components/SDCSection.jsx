import React, { Component } from "react";
import { Card } from "react-bootstrap";
import SDCQuestion from "./SDCQuestion"

export default class SDCSection extends Component {
  constructor(props){
    super(props);
    // props that are expected: a section schema JSON containing section_title, section_questions
    // as well as an onChange function to save answers

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Send answers "further up" to the draft page, where we can save them
  handleChange(value, questionID) {
    this.props.onChange(value, questionID);
  }

  render() {

    const cardStyle = {
      borderRadius: "15px",
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "rgb(0, 200, 200)",
      marginBottom: "20px",
      width: "100%",
      backgroundColor: "#32363e"
    }

    let questionComponents = []

    this.props.section.questions.forEach((question) => {
      questionComponents.push(
        <SDCQuestion question={question} onChange={this.handleChange}/>
      );
    });

    let subsectionComponents = []

    this.props.section.subSections.forEach((section) => {
      subsectionComponents.push(
        <SDCSection section={section} onChange={this.handleChange}/>
      );
    });

    return (
      <div>
        <Card style={cardStyle}>
          <h4 style={{marginLeft: "10px", marginTop: "5px", textAlign: "center"}}>{this.props.section.sectionTitle}</h4>
          {questionComponents}
          {subsectionComponents}
          {this.props.children}
        </Card>
      </div>
    );
  }
}

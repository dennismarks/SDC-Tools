import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class TrueFalseQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, question_id, answer

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    this.props.onChange(text);
  }

  render() {
    return (
      <div>
        <input type="radio" id={this.props.question_id + "True"} name={this.props.question_id} value="True" onChange={this.handleChange} checked={this.props.answer == "True" && true || this.props.answer != "True" && false} />
        <label for={this.props.question_id + "True"}>True</label>
        &emsp;
        <input type="radio" id={this.props.question_id + "False"} name={this.props.question_id} value="False" onChange={this.handleChange} checked={this.props.answer == "False" && true || this.props.answer != "False" && false} />
        <label for={this.props.question_id + "False"}>False</label>
        {this.props.children}
      </div>
    );
  }
}

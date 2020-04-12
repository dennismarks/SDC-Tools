import React, { Component } from "react";

export default class MultipleChoiceCheckboxQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, question_id, answer

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {}

    if (props.answer) {
      for (let i = 0; i < props.question_options.length; i++) {
        let option = props.question_options[i];
        if (props.answer.indexOf(option.optionID) > -1) {
          this.state[option.optionID] = true;
        }
        else {
          this.state[option.optionID] = false;
        }
      }
    }
  }

  handleChange(event) {
    let value = event.target.value;
    let newState = {};
    newState[value] = !this.state[value];
    this.setState(newState);

    let answer = [];
    for (let i = 0; i < this.props.question_options.length; i++) {
      let option = this.props.question_options[i];
      if (this.state[option.optionID]) {
        answer.push(option.optionID);
      }
    }
    this.props.onChange(answer);
  }

  render() {
    let components = []
    for (let i = 0; i < this.props.question_options.length; i++) {
      let option = this.props.question_options[i];
      components.push(
        <div style={{marginBottom: "3px"}}>
          <input type="checkbox" id={this.props.question_id + option.optionID} name={this.props.question_id} value={option.optionID} onChange={this.handleChange} checked={this.state[option.optionID]} />
          <label style={{paddingLeft: "3px"}} for={this.props.question_id + option.optionID}>{option.value}</label>
        </div>
      );
    }

    return (
      <div>
        {components}
        {this.props.children}
      </div>
    );
  }
}

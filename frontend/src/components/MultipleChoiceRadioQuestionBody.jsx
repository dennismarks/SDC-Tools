import React, { Component } from "react";

export default class MultipleChoiceRadioQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, question_id, answer

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const optionID = event.target.value;
    this.props.onChange(optionID);
  }

  render() {
    let components = []
    for (let i = 0; i < this.props.question_options.length; i++) {
      let option = this.props.question_options[i];
      components.push(
        <div style={{marginBottom: "3px"}}>
          <input type="radio" id={this.props.question_id + option.optionID} name={this.props.question_id} value={option.optionID} onChange={this.handleChange} checked={this.props.answer === option.optionID} />
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

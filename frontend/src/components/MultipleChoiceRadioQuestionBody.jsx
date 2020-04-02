import React, { Component } from "react";

export default class MultipleChoiceRadioQuestionBody extends Component {
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
    let components = []
    for (let i = 0; i < this.props.question_options.length; i++) {
      let option = this.props.question_options[i];
      components.push(
        <div style={{marginBottom: "3px"}}>
          <input type="radio" id={this.props.question_id + option["id"]} name={this.props.question_id} value={option["id"]} onChange={this.handleChange} checked={this.props.answer == option["id"]} />
          <label style={{paddingLeft: "3px"}} for={this.props.question_id + option["id"]}>{option["value"]}</label>
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

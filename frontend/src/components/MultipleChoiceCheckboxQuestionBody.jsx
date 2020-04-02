import React, { Component } from "react";

export default class MultipleChoiceCheckboxQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, question_id, answer

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      checked_options: {}
    }

    if (props.answer) {
      for (let i = 0; i < props.question_options.length; i++) {
        let option = props.question_options[i];
        if (props.answer.indexOf(option["id"]) > -1) {
          this.state["checked_options"][option["id"]] = true;
        }
        else {
          this.state["checked_options"][option["id"]] = false;
        }
      }
    }
  }

  handleChange(event) {
    let value = event.target.value;
    this.state["checked_options"][value] = !this.state["checked_options"][value]

    let answer = [];
    for (let i = 0; i < this.props.question_options.length; i++) {
      let option = this.props.question_options[i];
      if (this.state["checked_options"][option["id"]]) {
        answer.push(option["id"]);
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
          <input type="checkbox" id={this.props.question_id + option["id"]} name={this.props.question_id} value={option["id"]} onChange={this.handleChange} checked={this.state["checked_options"][option["id"]]} />
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

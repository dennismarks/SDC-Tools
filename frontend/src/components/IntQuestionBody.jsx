import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class TextQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, answer

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    const number = parseInt(text);
    this.props.onChange(number);
  }

  render() {
    return (
      <div>
        <input style={{paddingLeft: "3px"}} type="number" id={this.props.question_id} onChange={this.handleChange} value={this.props.answer} />
        {this.props.children}
      </div>
    );
  }
}

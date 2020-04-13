import React, { Component } from "react";

export default class TextQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, answer

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
        <input style={{width: "100%", paddingLeft: "3px"}} type="text" id={this.props.question_id} onChange={this.handleChange} value={this.props.answer} />
        {this.props.children}
      </div>
    );
  }
}

import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class IntQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, answer

    this.render = this.render.bind(this);
  }

  render() {
    return (
      <div>
        Int Works!
        {this.props.children}
      </div>
    );
  }
}

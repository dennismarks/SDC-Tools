import React, { Component } from "react";

export default class MultipleChoiceRadioQuestionBody extends Component {
  constructor(props){
    super(props);
    // props that are expected: onChange, question_id, answer

    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMoreInfoChange = this.handleMoreInfoChange.bind(this);

    let moreInfo = {};

    props.question_options.forEach((option) => {
      if (option.moreInfo) {
        moreInfo[option.optionID] = option.ResponseField;
      }
    });

    this.state = {
      answer: props.answer,
      moreInfo: moreInfo,
    };
  }

  handleChange(event) {
    const newValue = event.target.value;

    this.setState({
      answer: newValue
    });

    this.props.onChange(newValue, this.state.moreInfo);
  }

  handleMoreInfoChange(event) {
    let parentElement = event.target.parentNode;
    let optionID = parentElement.children[0].value;

    let newMoreInfoResponse = event.target.value;

    let newState = {};

    newState.moreInfo = this.state.moreInfo;
    newState.moreInfo[optionID] = newMoreInfoResponse;

    this.setState(newState);

    this.props.onChange(this.state.answer, newState.moreInfo);
  }

  render() {
    let components = []
    for (let i = 0; i < this.props.question_options.length; i++) {
      let option = this.props.question_options[i];
      components.push(
        <div style={{marginBottom: "3px"}}>
          <input type="radio" id={this.props.question_id + option.optionID} name={this.props.question_id} value={option.optionID} onChange={this.handleChange} checked={this.state.answer === option.optionID} />
          <label style={{paddingLeft: "3px"}} for={this.props.question_id + option.optionID}>{option.value}</label>
          {(this.state.answer === option.optionID) && (option.optionID in this.state.moreInfo) && (<input style={{width: "100%", paddingLeft: "3px"}} type="text" id={this.props.question_id + option.optionID + "moreInfo"} value={this.state.moreInfo[option.optionID]} onChange={this.handleMoreInfoChange} />)}
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

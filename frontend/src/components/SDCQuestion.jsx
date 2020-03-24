import React, { Component } from "react";
import { Card } from "react-bootstrap";

import TrueFalseQuestionBody from "./TrueFalseQuestionBody";
import MultipleChoiceRadioQuestionBody from "./MultipleChoiceRadioQuestionBody";
import MultipleChoiceCheckboxQuestionBody from "./MultipleChoiceCheckboxQuestionBody";
import TextQuestionBody from "./TextQuestionBody";
import IntQuestionBody from "./IntQuestionBody";

export default class SDCQuestion extends Component {
  constructor(props){
    super(props);
    // props are expected to be: question id, question title, question type, question text, question
    // options if applicable, and answer (if an answer has already been selected and saved)

    // Example implementation:
    // <SDCQuestion question_id="1" question_title="Title 1" question_type="true_false" question_text="Are you a student?" answer={true} />
    // <SDCQuestion question_id="2" question_title="Title 2" question_type="text" question_text="What is your name?" />
    // <SDCQuestion question_id="3" question_title="Title 3" question_type="int" question_text="What is your age?" answer={20} />
    // <SDCQuestion question_id="4" question_title="Title 4" question_type="multiple_choice_radio" question_text="Which drink do you prefer the most?" question_options={[{id: "0", value: "Water"}, {id: "1", value: "Orange Juice"}, {id: "2", value: "Coca-Cola"}]} answer="0" />
    // <SDCQuestion question_id="5" question_title="Title 5" question_type="multiple_choice_checkbox" question_text="What are your favourite foods?" question_options={[{id: "0", value: "Grilled Cheese"}, {id: "1", value: "Burger"}, {id: "2", value: "Chicken"}]} answer={["1", "2"]}/>

    this.render = this.render.bind(this);
    this.enable_question = this.enable_question.bind(this);
    this.disable_question = this.disable_question.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      is_enabled: true,
      is_true_false: false,
      is_multiple_choice_radio:false,
      is_multiple_choice_checkbox: false,
      is_int: false,
      is_text: false,
      answer: props.answer
    }

    if (props.question_type == "true_false") {
      this.state["is_true_false"] = true;
    }
    else if (props.question_type == "multiple_choice_radio") {
      this.state["is_multiple_choice_radio"] = true;
    }
    else if (props.question_type == "multiple_choice_checkbox") {
      this.state["is_multiple_choice_checkbox"] = true;
    }
    else if (props.question_type == "int") {
      this.state["is_int"] = true;
    }
    else {
      this.state["is_text"] = true;
    }
  }

  enable_question() {
    this.setState({
      is_enabled: true
    });
  }

  disable_question() {
    this.setState({
      is_enabled: false
    });
  }

  // In the future, options could have id's so that we could select id's instead of simply saving string values
  handleChange(value) {
    this.setState({
      answer: value
    })
    // Make api call to save answer
    // TODO
  }

  render() {
    // If this question is not enabled, do not render
    if (this.state.is_enabled == false) {
      return null;
    }

    const cardStyle = {
      borderRadius: "15px",
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "rgb(150, 70, 200)",
      margin: "5px"
    }

    return (
      <div>
        <Card style={cardStyle}>
          <Card.Body>
            <Card.Title>{this.props.question_title}</Card.Title>
            <Card.Text>
              <div style={{marginBottom: "5px"}}>{this.props.question_text}</div>
              {this.state.is_true_false && <TrueFalseQuestionBody question_id={this.props.question_id} onChange={this.handleChange} answer={this.state.answer}/>}
              {this.state.is_multiple_choice_radio && <MultipleChoiceRadioQuestionBody question_id={this.props.question_id} question_options={this.props.question_options} onChange={this.handleChange} answer={this.state.answer}/>}
              {this.state.is_multiple_choice_checkbox && <MultipleChoiceCheckboxQuestionBody  question_id={this.props.question_id} question_options={this.props.question_options} onChange={this.handleChange} answer={this.state.answer}/>}
              {this.state.is_int && <IntQuestionBody onChange={this.handleChange} answer={this.state.answer}/>}
              {this.state.is_text && <TextQuestionBody onChange={this.handleChange} answer={this.state.answer}/>}
            </Card.Text>
          </Card.Body>
        </Card>
        {this.props.children}
      </div>
    );
  }
}

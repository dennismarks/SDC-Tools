import React, { Component } from "react";
import { Table, Form, Col, Button } from "react-bootstrap";
import axios from "axios";

export default class FormPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeFormId = this.onChangeFormId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      formId: ""
    };
  }

  onChangeFormId(e) {
    this.setState({
      formId: e.target.value
    });
  }

  onSubmit(e) {
    console.log("Get Form: " + this.state.formId)
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>Find a Form:</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Form ID</Form.Label>
                <Form.Control
                  value={this.state.formId}
                  onChange={this.onChangeFormId}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      </div>
    );
  }
}

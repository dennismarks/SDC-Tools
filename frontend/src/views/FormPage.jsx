import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import axios from "axios";

export default class FormPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeFormId = this.onChangeFormId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      formId: "",
      allForms: []
    };
  }

  onChangeFormId(e) {
    this.setState({
      formId: e.target.value
    });
  }

  onSubmit(e) {
    console.log("Get Form: " + this.state.formId);
  }

  componentDidMount() {
    this.getFillouts();
  }

  getDedicatedFillout(formID) {
    axios({
      method: "get",
      url: "http://localhost:3001/api/v1/fillout",
      responseType: "application/json"
    }).then(response => {
      console.log(response.data);

      // if (formID)
      //   this.setState({
      //     formId: ""
      //     allForms: response.data.allForms
      //   });
      console.log(this.state.allForms);
    });
  }

  getFillouts() {
    axios({
      method: "get",
      url: "http://localhost:3001/api/v1/fillout",
      responseType: "application/json"
    }).then(response => {
      console.log(response.data);

      this.setState({
        formId: "-",
        allForms: response.data.allForms
      });
      console.log(this.state.allForms);
    });
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
                  id="1"
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="allForm">
              <Form.Label>Available Forms</Form.Label>
              <Form.Control as="select">
                <option selected>-</option>
                {this.state.allForms.map(x => (
                  <option value={x}>{x}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "10px", marginLeft: "6px" }}
          >
            Grab form
          </Button>
        </div>
      </div>
    );
  }
}

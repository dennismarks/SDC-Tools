import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import axios from "axios";

export default class FormPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeFormId = this.onChangeFormId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getDedicatedFillout = this.getDedicatedFillout.bind(this);
    this.getFillouts = this.getFillouts.bind(this);

    this.state = {
      formID: "",
      allForms: []
    };
  }

  onChangeFormId(e) {
    this.setState({
      formID: e.target.value
    });
  }

  onSubmit(e) {
    console.log("Get Form: " + this.state.formID);
  }

  componentDidMount() {
    this.getFillouts();
  }

  getDedicatedFillout(e) {
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/form/${this.state.formID}`,
      responseType: "application/json"
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getFillouts() {
    axios({
      method: "get",
      url: "http://localhost:3001/api/v1/form",
      responseType: "application/json"
    }).then(response => {
      console.log(response.data);

      this.setState({
        formID: 0,
        allForms: response.data.allForms.map(x => x.formID)
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
                  value={this.state.formID}
                  onChange={this.onChangeFormId}
                  id="1"
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="allForm">
              <Form.Label>Available Forms</Form.Label>
              <Form.Control as="select" onChange={this.onChangeFormId}>
                <option>-</option>
                {this.state.allForms.map(x => (
                  <option>{x}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "10px", marginLeft: "6px" }}
            onClick={this.getDedicatedFillout}
          >
            Grab form
          </Button>
        </div>
      </div>
    );
  }
}

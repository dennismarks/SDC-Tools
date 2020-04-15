import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import axios from "axios";

export default class FormPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeForm = this.onChangeForm.bind(this);
    this.getDedicatedFillout = this.getDedicatedFillout.bind(this);
    this.getFillouts = this.getFillouts.bind(this);

    this.state = {
      formID: "",
      formTitle: "",
      allForms: [],
      allFormsTitle: [],
    };
  }

  onChangeForm(e) {
    let newId = this.state.allForms[
      this.state.allFormsTitle.indexOf(e.target.value)
    ];
    this.setState({
      formID: newId,
      formTitle: e.target.value,
    });
  }

  componentDidMount() {
    this.getFillouts();
  }

  getDedicatedFillout(e) {
    axios({
      method: "get",
      url: `http://localhost:${process.env.PORT}/api/v1/form/GET/${this.state.formID}`,
      responseType: "application/json",
    })
      .then((response) => {
        window.open(
          `http://localhost:${process.env.PORT}/api/v1/form/GET/${this.state.formID}`,
          "_blank"
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFillouts() {
    axios({
      method: "get",
      url: `http://localhost:${process.env.PORT}/api/v1/form`,
      responseType: "application/json",
    }).then((response) => {
      console.log(response.data);

      this.setState({
        formID: response.data.allForms[0].formID,
        formTitle: response.data.allForms[0].formTitle,
        allForms: response.data.allForms.map((x) => x.formID),
        allFormsTitle: response.data.allForms.map((x) => x.formTitle),
      });
      console.log(this.state.allFormsTitle);
    });
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>Find a Form:</h1>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Form Title</Form.Label>
                <Form.Control
                  value={this.state.formTitle}
                  onChange={this.onChangeForm}
                  id="1"
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="allForm">
              <Form.Label>Available Forms</Form.Label>
              <Form.Control as="select" onChange={this.onChangeForm}>
                {this.state.allFormsTitle.map((x) => (
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

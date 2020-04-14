import React, { Component } from "react";
import { Table, Form, Col, Button } from "react-bootstrap";
import axios from "axios";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      patientID: "",
      formID: "",
      patients: [],
      forms: [],
    };
  }

  componentDidMount() {
    this.getPatients();
    this.getForms();
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  getPatients() {
    axios.get("http://localhost:3001/api/v1/patient/").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);

        this.setState({
          patients: response.data,
        });
      }
    });
  }

  getForms() {
    axios.get("http://localhost:3001/api/v1/form/").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);

        this.setState({
          forms: response.data,
        });
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // const patient = {
    //   //TODO: this needs to be a util
    //   patientID: require("crypto")
    //     .createHash("SHA256")
    //     .update(this.state.name.concat(this.state.email, this.state.phone))
    //     .digest("hex")
    //     .slice(0, 15),
    //   //TODO: put slice number as env variable
    //   name: this.state.name,
    //   email: this.state.email,
    //   phone: this.state.phone,
    // };

    // console.log(patient);
    // axios
    //   .post("http://localhost:3001/api/v1/patient/add", patient)
    //   .then((res) => {
    //     console.log(res.data);
    //     this.getPatients();
    //   });

    // this.setState({
    //   name: "",
    //   email: "",
    //   phone: "",
    // });
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>Add a New Patient:</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  value={this.state.phone}
                  onChange={this.onChangePhone}
                />
              </Form.Group>
              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "32px", marginLeft: "6px" }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
          <br />
          <br />
          <h1>Current patients in a database:</h1>
          <Table
            striped
            bordered
            hover
            variant="dark"
            style={{ maxWidth: "700px" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.patients.map((p) => (
                <tr key={p.patientID}>
                  <td>{p.patientID}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      phone: "",
      patients: []
    };
  }

  componentDidMount() {
    this.getPatients();
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  getPatients() {
    axios.get("http://localhost:3001/patient/").then(response => {
      if (response.data.length > 0) {
        console.log(response.data);

        this.setState({
          patients: response.data
        });
      }
      console.log(this.state.patients);
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const patient = {
      patient_number: this.state.patients.length,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };

    console.log(patient);
    axios.post("http://localhost:3001/patient/add", patient).then(res => {
      console.log(res.data);
      this.getPatients();
    });

    this.setState({
      name: "",
      email: "",
      phone: ""
    });
  }

  render() {
    return (
      <div className="">
        <div className="App-header">
          <h1>Add a New Patient:</h1>
          <div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onChangeName}
              />
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={this.state.phone}
                onChange={this.onChangePhone}
              />
              <input type="submit" value="Add" />
            </form>
          </div>
          <br />
          <h3>Current patients in a database:</h3>
          <div>
            {this.state.patients.map(p => (
              <div key={p.patient_number}>
                ID: {p.patient_number}, name: {p.name}, email: {p.email}, phone:{" "}
                {p.phone}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

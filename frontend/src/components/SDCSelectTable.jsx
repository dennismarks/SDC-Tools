import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

export default class SDCSelectTable extends Component {
  constructor(props) {
    super(props);

    this.retrieveAllPatients = this.retrieveAllPatients.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
    this.retrieveAllForms = this.retrieveAllForms.bind(this);
    this.searchForm = this.searchForm.bind(this);
    this.getFormTableRows = this.getFormTableRows.bind(this);
    this.getPatientTableRows = this.getPatientTableRows.bind(this);

    this.handleFormClick = this.handleFormClick.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);

    this.state = {
      patientSearch: "",
      formSearch: "",
      patientID: "",
      formID: "",
      allPatients: [],
      allForms: [],
    };
  }

  componentWillMount() {
    this.retrieveAllForms();
    this.retrieveAllPatients();
  }

  retrieveAllPatients() {
    axios.get(`http://localhost:3001/api/v1/patient/`).then((res) => {
      this.setState({
        allPatients: res.data,
      });
    });
  }

  searchPatient() {
    axios
      .get(
        `http://localhost:3001/api/v1/patient/search/${this.state.patientSearch}`
      )
      .then((res) => {
        this.setState({
          allPatients: res.data,
        });
      });
  }

  retrieveAllForms() {
    axios.get(`http://localhost:3001/api/v1/form/`).then((res) => {
      this.setState({
        allForms: res.data.allForms,
      });
    });
  }

  searchForm() {
    axios
      .get(`http://localhost:3001/api/v1/form/search/${this.state.formSearch}`)
      .then((res) => {
        this.setState({
          allForms: res.data.allForms,
        });
      });
  }

  getFillouts() {
    axios({
      method: "get",
      url: "http://localhost:3001/api/v1/form",
      responseType: "application/json",
    }).then((response) => {
      console.log(response.data);

      this.setState({
        allForms: response.data.allForms,
      });
      console.log(this.state.allFormsTitle);
    });
  }

  handleFormClick(formID) {
    this.setState({
      formID: formID,
    });
  }

  handlePatientClick(patientID) {
    this.setState({
      patientID: patientID,
    });
  }

  getFormTableRows() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Selection</th>
          </tr>
        </thead>
        <tbody>
          {this.state.allForms.map((form) => (
            <tr key={form.formID}>
              <td>{form.formID}</td>
              <td>{form.formTitle}</td>
              {this.state.formID === form.formID ? (
                <td>Selected</td>
              ) : (
                <td>
                  <Button
                    onClick={() => {
                      this.handleFormClick(form.formID);
                    }}
                  >
                    Select
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  getPatientTableRows() {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Selection</th>
          </tr>
        </thead>
        <tbody>
          {this.state.allPatients.map((patient) => (
            <tr key={patient.patientID}>
              <td>{patient.patientID}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              {this.state.patientID === patient.patientID ? (
                <td>Selected</td>
              ) : (
                <td>
                  <Button
                    onClick={() => {
                      this.handlePatientClick(patient.patientID);
                    }}
                  >
                    Select
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div className="sdc-select-table">
        {this.getFormTableRows()}
        {this.getPatientTableRows()}
      </div>
    );
  }
}

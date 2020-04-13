import React, { Component } from "react";
import { Button, Form, Col, Table } from "react-bootstrap";
import axios from "axios";

export default class SDCSelectTable extends Component {
  constructor(props) {
    super(props);

    this.retrieveAllPatients = this.retrieveAllPatients.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
    this.retrieveAllForms = this.
    this.getTableRow = this.getTableRow.bind(this);
    this.state = {
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
  
  retrieveAllPatients(event) {
    event.preventDefault();
    axios.get(`http://localhost:3001/api/v1/patient/`).then((res) => {
      this.setState({
        allPatients: res.data,
      });
    });
  }

  searchPatient(event) {
    event.preventDefault();
    axios
      .get(
        `http://localhost:3001/api/v1/patient/search/${this.state.patientName}`
      )
      .then((res) => {
        this.setState({
          allPatients: res.data,
        });
      });
  }

  retrieveAllForms(event) {
    event.preventDefault();
    axios.get(`http://localhost:3001/api/v1/form/`).then((res) => {
      this.setState({
        allPatients: res.data,
      });
    });
  }

  searchForm(event) {
    event.preventDefault();
    axios
      .get(
        `http://localhost:3001/api/v1/patient/search/${this.state.patientName}`
      )
      .then((res) => {
        this.setState({
          allPatients: res.data,
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

  getTableRow() {
    return (
      <Table>
        {this.allForms.map((form) => 
          <Col></Col>
        )}
      </Table>
    );
  }

  render() {
    return <div className="sdc-select-table"></div>;
  }
}

import React, { Component } from "react";
import { Form, Button, Col, Table } from "react-bootstrap";
import axios from "axios";


export default class PatientPage extends Component {
  constructor(props) {
    super(props);

      this.state = {
        patientName: '',
        allPatients: [],
        related_Forms: []
      }

      this.retireveAllRelatedForms = this.retireveAllRelatedForms.bind(this);
      this.renderAPage = this.renderAPage.bind(this);
    }

    retrieveAllPatients = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/api/v1/patient/search/${this.state.patientName}`).then(res => {
            const all_patients = res.data
            this.setState({
                allPatients: all_patients
            })
            
        })
    }

    retireveAllRelatedForms = (pID) => {
        let length_of_patients = this.state.allPatients.length
        for(let i = 0; i< length_of_patients; i++){
            
            if (this.state.allPatients[i].patientID === pID){
                this.setState({
                    related_Forms: this.state.allPatients[i].relatedForms
                })
            }
            }

    }

    enterPatientName = (event) => {
        this.setState({
            patientName: event.target.value
          });
     }
    

    renderAPage = (dID) =>{
        window.open(`/draft/get/:diagnosticID `)
    }

    render() {
        return (
            <div>
                <div className="App-header">
                <h1>Enter Patient ID:</h1>
                <Form onSubmit={this.retrieveAllPatients}>
                    <Form.Row>
                        <Col>
                        <Form.Group>
                        <Form.Label>Patient Name:</Form.Label>
                        <Form.Control
                        value={this.state.name}
                        onChange={this.enterPatientName}
                        />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Button
                        variant="primary"
                        type="submit"
                        style={{ marginTop: "32px", marginLeft: "6px" }}
                        >
                        Submit
                        </Button>
                        </Col>
                    </Form.Row>     
                </Form>

                <Table
                striped
                bordered
                hover
                variant="dark"
                style={{ maxWidth: "300px" }}>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone #</th>
                        <th>Choose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allPatients.map(patient => (
                            <tr>
                            <td>{patient.name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phone}</td>
                            <td>
                                <Button onClick={() => this.retireveAllRelatedForms(patient.patientID)}>Choose</Button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                </Table>

                <Table
                striped
                bordered
                hover
                variant="dark"
                style={{ maxWidth: "300px" }}>
                    <thead>
                        <tr>
                        <th>filler</th>
                        <th>link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.related_Forms.map(formObject => (
                            <tr>
                            <td>{formObject.filler}</td>
                            <td>
                                <Button>Link</Button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                </Table>
                </div>           
            </div>
        );
    }
}

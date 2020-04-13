import React, { Component } from "react";
import { Form, Button, Col, Table } from "react-bootstrap";
import axios from "axios";


export default class PatientPage extends Component {
  constructor(props) {
    super(props);

      this.state = {
        patientName: '',
        allPatients: [],
        relatedForms: [],
        showTr_1: false,
        showTr_2: false
      }

      this.retireveAllRelatedForms = this.retireveAllRelatedForms.bind(this);
      this.renderAPage = this.renderAPage.bind(this);
    }

    retrieveAllPatients = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/api/v1/patient/search/${this.state.patientName}`).then(res => {
            this.setState({
                allPatients: res.data,
                showTr_1: true
            })
            
        })
    }

    retireveAllRelatedForms = (pID) => {
        let lengthOfPatients = this.state.allPatients.length
        for(let i = 0; i< lengthOfPatients; i++){
            if (this.state.allPatients[i].patientID === pID){
                this.setState({
                    relatedForms: this.state.allPatients[i].relatedForms,
                    showTr_2: true
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
                <h1>Enter Patient Name:</h1>
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
                style={{ maxWidth: "max-content" }}>
                    <div style={{display : this.state.showTr_1 ? 'block':'none'}}>
                    <thead >
                        <tr >
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
                    </div>
                </Table>

                <Table
                striped
                bordered
                hover
                variant="dark"
                style={{ maxWidth: "max-content" }}>
                    <div style={{display : this.state.showTr_2 ? 'block':'none'}}>
                    <thead>
                        <tr>
                        <th>filler</th>
                        <th>link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.relatedForms.map(formObject => (
                            <tr>
                            <td>{formObject.filler}</td>
                            <td>
                                <Button>Link</Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                    </div>
                </Table>
                </div>           
            </div>
        );
    }
}

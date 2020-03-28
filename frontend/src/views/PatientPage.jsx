import React, { Component } from "react";
import { Form, Button, Col, Table } from "react-bootstrap";
import axios from "axios";

export default class PatientPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        patientID: ''
      }

      this.retrievePatient = this.retrievePatient.bind(this);
      this.enterPatientID = this.enterPatientID.bind(this);
      
    }

    retrievePatient = (event) => {
        event.preventDefault();
        console.log("hello");
    
        console.log(this.state.patientID)

        axios.get(`http://localhost:3001/api/v1/patient/${this.state.patientID}`).then(res => {
            console.log(res);
        })
    }

    enterPatientID = (event) => {
        console.log("hello 2");
        this.setState({
            patientID: event.target.value
          });
     }


    render() {
        return (
            <div>
                <div className="App-header">
                <h1>Enter Patient ID:</h1>
                <Form onSubmit={this.retrievePatient}>
                    <Form.Row>
                        <Col>
                        <Form.Group>
                        <Form.Label>Patient ID:</Form.Label>
                        <Form.Control
                        value={this.state.name}
                        onChange={this.enterPatientID}
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
                style={{ maxWidth: "700px" }}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                </div>           
            </div>
        );
    }
}


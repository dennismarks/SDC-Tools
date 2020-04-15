import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components/macro";
import searchIcon from "../img/icon-search.svg";
import eclipse from "../img/ellipse.svg";

const FormsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 24px;
`;

const TableContainer = styled.div`
  margin: 24px;
  padding: 12px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #5495c9;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 52px;
    line-height: 55px;
    color: #ffffff;
    margin-bottom: 16px;
  }
  .searchInput {
    background-image: url(${searchIcon});
    background-position: 8px 10px;
    background-repeat: no-repeat;
    background-size: 22px 22px;
    width: 100%;
    font-size: 16px;
    padding: 8px 20px 8px 40px;
    border: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const Table = styled.table`
  z-index: 9999;
  z-index: 1;
  width: 100%;
  font-size: 20px;
  color: #fff;
  background-color: #5495c9;
  th,
  td {
    text-align: left;
    padding: 8px;
  }
  td:last-child {
    text-align: center;
  }
  th {
    background-color: #e59c63;
  }
  tr:nth-child(odd) {
    background-color: #5495c9;
  }
  tr:nth-child(even) {
    background-color: #639ece;
  }
`;

const GetDraftButton = styled.button`
  position: relative;
  width: 200px;
  height: 50px;
  margin: 0 auto;
  display: block;
  background: #e59c63;
  border-radius: 8px;
  font-weight: 800;
  font-family: Arial;
  font-size: 18px;
  color: #ffffff;
  border: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    background: #ce8c59;
  }
`;

const Eclipse = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 20%;
  z-index: -9999;
`;

export default class SDCSelectTable extends Component {
  constructor(props) {
    super(props);

    this.retrieveAllPatients = this.retrieveAllPatients.bind(this);
    this.retrieveAllForms = this.retrieveAllForms.bind(this);
    this.getFormTableRows = this.getFormTableRows.bind(this);
    this.getPatientTableRows = this.getPatientTableRows.bind(this);

    this.handleFormClick = this.handleFormClick.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);
    this.handleCreateDraft = this.handleCreateDraft.bind(this);

    this.state = {
      patientSearch: "",
      formSearch: "",
      patientID: "",
      formID: "",
      allPatients: [],
      allForms: [],
    };

    this.fileInput = React.createRef();
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

  onChangeSearchPatientName = (e) => {
    this.setState({
      patientSearch: e.target.value,
    });

    if (e.target.value === "") {
      this.retrieveAllPatients();
    } else {
      const newPatients = this.state.allPatients.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      this.setState({
        allPatients: newPatients,
      });
    }
  };

  retrieveAllForms() {
    axios.get(`http://localhost:3001/api/v1/form/`).then((res) => {
      this.setState({
        allForms: res.data.allForms,
      });
    });
  }

  onChangeSearchForm = (e) => {
    this.setState({
      formSearch: e.target.value,
    });

    if (e.target.value === "") {
      this.retrieveAllForms();
    } else {
      const newForms = this.state.allForms.filter((f) =>
        f.formTitle.toLowerCase().includes(e.target.value.toLowerCase())
      );

      this.setState({
        allForms: newForms,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const file = new FormData();

    file.set("xml", this.fileInput.current.files[0]);

    axios({
      method: "post",
      url: `http://localhost:3001/api/v1/form/import`,
      data: file,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        this.retrieveAllForms();
        alert(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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

  handleCreateDraft() {
    if (!this.state.patientID) {
      alert("Please select patient!");
      return console.log("Please select patient!");
    }
    if (!this.state.formID) {
      alert("Please select form!");
      return console.log("Please select form!");
    }

    if (this.state.formID && this.state.patientID) {
      axios({
        method: "get",
        url: `http://localhost:3001/api/v1/form/get/${this.state.formID}/${this.state.patientID}`,
        responseType: "application/json",
      }).then((response) => {
        const diagnosticID = response.data.diagnosticID;
        window.open(`/draft/${diagnosticID}`);
      });
    }
  }

  getFormTableRows() {
    return (
      <TableContainer>
        <h1>Forms</h1>
        <input
          className="searchInput"
          value={this.state.formSearch}
          onChange={this.onChangeSearchForm}
          placeholder="Form title.."
        ></input>
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
                  <td>
                    <Button enabled={false}>Selected</Button>
                  </td>
                ) : (
                  <td>
                    <Button
                      style={{ backgroundColor: "#005988", border: "none" }}
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
        {this.getNewFormUpload()}
      </TableContainer>
    );
  }

  getPatientTableRows = () => {
    return (
      <TableContainer>
        <h1>Patients</h1>
        <input
          className="searchInput"
          value={this.state.patientSearch}
          onChange={this.onChangeSearchPatientName}
          placeholder="Patient name.."
        ></input>
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
                  <td>
                    <Button enabled={false}>Selected</Button>
                  </td>
                ) : (
                  <td>
                    <Button
                      style={{ backgroundColor: "#005988", border: "none" }}
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
      </TableContainer>
    );
  };

  getNewFormUpload = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h5 style={{ color: "white", fontWeight: "bold", marginTop: "24px" }}>
            Upload a new form:
          </h5>
          <input
            style={{ fontSize: "12px", color: "white" }}
            type="file"
            ref={this.fileInput}
            accept="text/xml"
          />
        </label>
        <br />
        <button
          style={{
            fontSize: "14px",
            width: "82px",
            backgroundColor: "#e59c63",
            border: "none",
            color: "white",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  };

  render() {
    return (
      <div
        className="sdc-select-table"
        style={{ marginTop: "80px", marginBottom: "100px" }}
      >
        <FormsContainer>
          {this.getFormTableRows()}
          {this.getPatientTableRows()}
        </FormsContainer>
        <GetDraftButton onClick={this.handleCreateDraft}>
          GET DRAFT
        </GetDraftButton>
        <Eclipse src={eclipse}></Eclipse>
      </div>
    );
  }
}

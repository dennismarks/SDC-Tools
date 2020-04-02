import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class Main extends Component {
  constructor(props) {
    super(props);
    console.log("initialized");
  }

  render() {
    return (
      <div className="app-frame">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          style={{ position: "fixed", width: "100vw", height: "50px" }}
        >
          <Navbar.Brand href="/">SDCTools</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/forms">Forms</Nav.Link>
              <Nav.Link href="/patients">Patients</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link eventKey={2} href="/contact">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

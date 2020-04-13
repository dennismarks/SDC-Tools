import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import icon from "../img/main-icon.png";

const link = {
  fontFamily: "Arial",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "21px",
  color: "#E7EFF6",
  paddingRight: "35px",
  textDecoration: "none",
};

export default class Main extends Component {
  render() {
    return (
      <div className="app-frame">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          style={{ position: "fixed", width: "100vw", height: "50px", zIndex: "100" }}
          fixed="top"
        >
          <Link to="/">
            <img
              style={{ width: "50px", marginLeft: "50px", paddingTop: "10px" }}
              src={icon}
              alt=""
            />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" style={{ paddingRight: "50px" }}>
              <Link style={link} to="/forms">
                Forms
              </Link>
              <Link style={link} to="/patients">
                Patients
              </Link>
              <Link style={link} to="/about">
                About
              </Link>
              <Link style={link} to="/contact">
                Contact Us
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import logo from "../img/home-page-img.svg";
import eclipse from "../img/ellipse.svg";

const Container = styled.div`
  /* background-color: #5495c9; */
  background-image: linear-gradient(to bottom right, #4189c3, #7badd5);
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const GridH2 = styled.div`
  margin: 0 auto;
  padding-top: 140px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  max-width: 1200px;
`;

const GridV3 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-height: 280px;
  align-items: center;
  h1 {
    margin-top: 150px;
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 74px;
    color: #fff;
  }
  p {
    font-family: Arial;
    font-size: 28px;
    line-height: 32px;
    color: #e7eff6;
  }
  button {
    width: 180px;
    height: 50px;
    margin-top: 24px;
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
  }
`;

const Logo = styled.img`
  width: 690px;
`;

const Eclipse = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 30%;
`;

export default class MainPage extends Component {
  render() {
    return (
      <Container>
        <GridH2>
          <GridV3>
            <h1>SDCTools</h1>
            <p>
              A modern infrastructure to facilitate health care providers
              entering structured clinical notes
            </p>
            <Link to="/forms">
              <button>GO TO FORMS</button>
            </Link>
          </GridV3>
          <Logo src={logo} alt="" />
        </GridH2>
        <Eclipse src={eclipse}></Eclipse>
      </Container>
    );
  }
}

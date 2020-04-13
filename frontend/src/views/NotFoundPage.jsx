import React from "react";
import SDCSelectTable from "../components/SDCSelectTable";

export default class FormPage extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <div className="App-header">
          {/* <h1>404 Not Found</h1> */}
          <SDCSelectTable />
        </div>
      </div>
    );
  }
}

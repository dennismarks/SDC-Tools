import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main"
import Home from "./views/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Main />
      <Switch>
      	<Route pattern="/" exact component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;

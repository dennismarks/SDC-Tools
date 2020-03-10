import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main"
import HomePage from "./views/HomePage";
import FormPage from "./views/FormPage";
import NotFoundPage from "./views/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Main />
      <Switch>
      	<Route path="/" exact component={HomePage}/>
      	<Route path="/forms" exact component={FormPage}/>
      	<Route exact component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;

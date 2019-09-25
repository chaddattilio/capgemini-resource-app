import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import SeeResources from "./SeeResources";
import Home from "./Home";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <SeeResources path="/resources" />
    </Router>
  );
};

render(<App />, document.getElementById("root"));
//export default App;

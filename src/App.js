import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SeeResources from "./SeeResources";
import Home from "./Home";

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

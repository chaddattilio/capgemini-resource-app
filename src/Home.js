import React from "react";
import { Router, Link } from "@reach/router";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="title">Welcome to the resourcing tool</div>
        <div className="sub-title">What do you want to do?</div>
        <div className="options">
          <Link to="/resources">Get current view of resources</Link>
        </div>
      </div>
    );
  }
}

export default Home;

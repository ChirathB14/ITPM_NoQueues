import React, { Component } from "react";
import CommonSlider from "./CommonSlider";

export default class OperatorHome extends Component {


  render() {
    return (
      <div className="container">
        <div className="row pt-2">
          <div className="col">
            <a href="/bills" style={{ textDecoration: "none", color: "white" }}>
              <button
                className="btn btn-primary container-fluid "
                style={{ height: "5rem" }}
              >
                <h2>Create Bills</h2>
              </button>
            </a>
          </div>
          <div className="col">
            <a href="/sales" style={{ textDecoration: "none", color: "white" }}>
              <button
                className="btn btn-primary container-fluid"
                style={{ height: "5rem" }}
              >
                <h2>View Sales</h2>
              </button>
            </a>
          </div>
        </div>
        <CommonSlider />
      </div>
    );
  }
}

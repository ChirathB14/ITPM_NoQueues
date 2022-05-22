import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import LandingSlider from "./Sliders/LandingSlider";

export default class LandingPage extends Component {
  render() {
    return (
      <div
        className="container-fluid text-center d-flex "
        style={{ marginTop: "50px" }}
      >
        <Row>
          <Col sm={7}>
            <LandingSlider />
          </Col>
          <Col sm={5}>
            <div className="container text-center">
              <Row>
                <a
                  href="/customer/register"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "24px",
                  }}
                >
                  <button
                    className="btn btn-success"
                    style={{
                      marginTop: "50px",
                      padding: "10px",
                      height: "10vh",
                      width: "100%",
                    }}
                  >
                    <span className="h5 mx-2">Register as a customer</span>
                    <i className="fa fa-user-plus fa-lg" aria-hidden="true"></i>
                  </button>
                </a>
              </Row>
              <Row>
                <a
                  href="/customer/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "24px",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: "50px",
                      padding: "10px",
                      height: "10vh",
                      width: "100%",
                    }}
                  >
                    <span className="h5 mx-2">Customer Login</span>
                    <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>
                  </button>
                </a>
              </Row>
              <hr
                style={{
                  margin: "50px",
                  height: "1vh",
                }}
              />
              <Row>
                <a
                  href="/employee/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "24px",
                  }}
                >
                  <button
                    className="btn btn-secondary"
                    style={{
                      padding: "10px",
                      height: "10vh",
                      width: "100%",
                    }}
                  >
                    <span className="h5 mx-2">Employee Login</span>
                    <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>
                  </button>
                </a>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

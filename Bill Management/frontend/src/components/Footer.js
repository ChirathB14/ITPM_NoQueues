import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <div style={{ position: "relative", paddingTop: "3em" }}>
        <Navbar
          bg="dark"
          variant="dark"
          expand="md"
          style={{ padding: "5px 0px", align: "center" }}
        >
          <Container>
            <Navbar.Text className="m-auto">
              <span>
                {localStorage.getItem("employeeName") ? (
                  <a href="/" style={{ textDecoration: "none" }}>
                    NoQueues
                  </a>
                ) : (
                  <a href="http://localhost:3000" style={{ textDecoration: "none" }}>
                    NoQueues
                  </a>
                )}
                &nbsp;<i className="fa-regular fa-copyright fa-sm"></i>&nbsp;
                {new Date().getFullYear()}
                {/* Outputs Curent year(2022) */}
              </span>
            </Navbar.Text>
          </Container>
        </Navbar>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("employeeName") && (
            <Navbar
              bg="light"
              expand="sm"
              className="navbar navbar-expand-lg navbar-light bg-light"
              style={{
                marginBottom: "15px",
                padding: "10px 20px",
              }}
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <h4>
                    <Nav.Link href="/">Home</Nav.Link>
                  </h4>
                  <h4>
                    <Nav.Link href="/bills">Create Bills</Nav.Link>
                  </h4>
                  <h4>
                    <Nav.Link href="/sales">Sales</Nav.Link>
                  </h4>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}
      </div>
    );
  }
}

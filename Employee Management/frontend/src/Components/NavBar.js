import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class NavBar extends Component {
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
              padding: "10px 15px",
              fontWeight: "700",
              fontSize: "50",
            }}
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">
                  {" "}
                  <b>Home </b>
                </Nav.Link>
                <Nav.Link href="/add-new-employee">
                  {" "}
                  <b> Add New Employee </b>{" "}
                </Nav.Link>
                <Nav.Link href="/get-all-employee">
                  {" "}
                  <b> View All Employees </b>
                </Nav.Link>
                <Nav.Link href="/get_report">
                  {" "}
                  <b> Download Report </b>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </div>
    );
  }
}
export default NavBar;

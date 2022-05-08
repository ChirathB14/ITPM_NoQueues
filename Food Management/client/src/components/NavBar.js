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
              fontWeight: "700",
            }}
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/register">Add Food Item</Nav.Link>
                <Nav.Link href="/foods">Food List</Nav.Link>
                <Nav.Link href="/order">Order Status</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("customerID") &&
          localStorage.getItem("type") === "customer" && (
            <Navbar
              bg="light"
              expand="sm"
              className={"navbar navbar-expand-lg navbar-light bg-light"}
              style={{
                marginBottom: "15px",
                padding: "10px 20px",
                fontWeight: "700",
              }}
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto ">
                  <Nav.Link href="/customer/home">Home</Nav.Link>
                  <Nav.Link href="/customer/orders/create">
                    Create an order
                  </Nav.Link>
                  <Nav.Link href="/customer/orders/view">My Orders</Nav.Link>
                  <Nav.Link href="/customer/profile">My Profile</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}
      </div>
    );
  }
}

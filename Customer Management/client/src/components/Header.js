import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import { toast } from "react-toastify";

class Header extends Component {

  logout() {
    localStorage.removeItem("customerID");
    localStorage.removeItem("customerName");
    localStorage.removeItem("type");
    toast.info("Logging out...", {
      autoClose: 800,
      progress: undefined,
    });
    setTimeout(() => {
      window.location = "/";
      toast.success("Logged out!", {
        autoClose: 2000,
      });
    }, 1000);
  };

  render() {
    const username = localStorage.getItem("customerName");

    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{ padding: "20px 30px" }}>
          {localStorage.getItem("customerID") ? (
            <Navbar.Brand href="/customer/home">
              <i className="fas fa-utensils fa-xl"></i> &nbsp; NoQueues
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="/">
              <i className="fas fa-utensils fa-xl"></i> &nbsp; NoQueues
            </Navbar.Brand>
          )}
          <Navbar.Toggle />
          {localStorage.getItem("customerID") ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Hello, <a href={`/customer/profile`}>{username}</a>
              </Navbar.Text>
              <Button className="btn btn-danger mx-3" onClick={this.logout}>
                Logout&nbsp;&nbsp;&nbsp;
                <i className="fas fa-sign-out-alt"></i>
              </Button>
            </Navbar.Collapse>
          ) : null}
        </Navbar>
      </div>
    );
  }
}
export default withRouter(Header);

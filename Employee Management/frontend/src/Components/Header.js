import React, { Component } from "react";
import { Button, Navbar } from "react-bootstrap";
import { toast } from "react-toastify";

class Header extends Component {
  constructor(props) {
    super(props);

    this.setEmpDetails();
  }

  setEmpDetails = () => {
    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    const loginStatus = urlParams.get("login");
    if (loginStatus !== null) {
      const employeeName = urlParams.get("employeeName");
      console.log(employeeName);
      localStorage.setItem("employeeName", employeeName);
    }
  };

  logout = (e) => {
    localStorage.removeItem("employeeName");
    toast.info("Logging out...", {
      autoClose: 800,
      progress: undefined,
    });
    setTimeout(() => {
      window.location = "http://localhost:3000/";
      toast.success("Logged out!", {
        autoClose: 2000,
      });
    }, 1000);
  };

  render() {
    const username = localStorage.getItem("employeeName");

    return (
      <div>
        <Navbar bg="dark" variant="dark" style={{ padding: "20px 30px" }}>
          {localStorage.getItem("employeeName") ? (
            <Navbar.Brand href="/">
              <i className="fas fa-utensils fa-xl"></i> &nbsp; NoQueues
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="http://localhost:3000">
              <i className="fas fa-utensils fa-xl"></i> &nbsp; NoQueues
            </Navbar.Brand>
          )}
          <Navbar.Toggle />
          {localStorage.getItem("employeeName") ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Hello, {username}
              </Navbar.Text>
              <Button
                className="btn btn-danger"
                style={{ marginLeft: "15px" }}
                onClick={this.logout}
              >
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
export default Header;

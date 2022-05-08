import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Logo from "../../assets/images/logo.png";
import Back from "../../assets/images/emp1.jpg";
//import { Navbar, Nav } from "react-bootstrap";
import { Navbar, Container } from "react-bootstrap";
import LandingSlider from "../LandingSlider";

class EmployeeHome extends Component {
  render() {
    return (
      <div className="contianer-fluid">
        <header id="home"></header>
        <div className="main-top py-1">
          <div className="container">
            <div className="nav-content">
              <div className="nav_web-dealingsls">
                <nav>
                  <input type="checkbox" id="drop" />
                </nav>
              </div>
            </div>
          </div>
        </div>
        

        {/* <div className="main-banner-2 container-fluid"></div> */}
        <LandingSlider />

        <div className="breadcrumb-agile bg-light py-2 container-fluid">
          <ol className="breadcrumb bg-light m-0">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Employee Dashboard
            </li>
          </ol>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 p-4 mx-left">
              <br /> <br />
              <img src={Back} alt="" />
            </div>

            <div className="col-6 p-4 mx-left">
              <div className="login-contect py-5">
                <div className="container py-xl-5 py-3">
                <br/>
                  <div className="login-body">
                  <br/>
                    <div className="login p-4 mx-aauto">
                     
                      <Link to="/add-new-employee">
                        <button
                          type="submit"
                          className="btn btn-primary submit mb-4"
                        >
                          Add New Employee
                        </button>
                      </Link>
                      <br/>
                      <Link to="/get-all-employee">
                        <button
                          type="submit"
                          className="btn btn-primary submit mb-4"
                        >
                          View All Employees
                        </button>
                      </Link>
                      <br/>
                      <Link to="/get_report">
                        <button
                          type="submit"
                          className="btn btn-primary submit mb-4"
                        >
                          Download Report
                        </button>  <br/>  
                       
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EmployeeHome;

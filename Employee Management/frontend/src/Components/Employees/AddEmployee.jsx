import React, { Component } from "react";
import { Link } from "react-router-dom"; //for page link like href
import axios from "axios"; //for connect backend apis
import { toast } from "react-toastify"; // for msg
import { APIURL } from "../../API/environment"; // .env backend url
//import Logo from "../../assets/images/logo.png";
import Back from "../../assets/images/emp2.jpg"; // A image
import { Navbar, Container } from "react-bootstrap";
import LandingSlider from "../LandingSlider";

const initialState = { //input field names
  employee_id: "",
  employee_first_name: "",
  employee_last_name: "",
  employee_age: "",
  employee_nic: "",
  employee_dob: "",
  employee_gender: "",
  employee_address: "",
  employee_email: "",
  employee_phone: "",
  employee_post: "",
  employee_basicSalary: "",
  employee_username: "",
  employee_password: "",
  employee_confirm_password: "",
  image: null,
};

class AddEmployee extends Component {
  constructor(props) {
    super(props); //pass data in react
    this.state = initialState;
    this.onChange = this.onChange.bind(this); //To get inputs from the user we need this
    this.onSubmit = this.onSubmit.bind(this); // put method is done here
    
  }

  

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(event) { 
    event.preventDefault(); // Avoid erasing data after when clicking submit btn
// object
    let EmployeeDetails = {
      employee_id: this.state.employee_id, // mongo db name lefthand side
      employee_first_name: this.state.employee_first_name,
      employee_last_name: this.state.employee_last_name,
      employee_age: this.state.employee_age,
      employee_nic: this.state.employee_nic,
      employee_dob: this.state.employee_dob,
      employee_gender: this.state.employee_gender,
      employee_address: this.state.employee_address,
      employee_email: this.state.employee_email,
      employee_phone: this.state.employee_phone,
      employee_post: this.state.employee_post,
      employee_basicSalary: this.state.employee_basicSalary,
      employee_username: this.state.employee_username,
      employee_password: this.state.employee_password,
      employee_confirm_password: this.state.employee_confirm_password,
    };

    axios //API for Add new employee
      .post(`${APIURL}/employee/add-new-employee`, EmployeeDetails)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.setTimeout(function () { // The setTimeout function is a native JavaScript function. 
            window.location.href = "/add-new-employee"; //It sets a timer (a countdown set in milliseconds) 
          }, 2000); //for an execution of a callback function, calling the function upon completion of the timer.
        } else {   //add new employee form will receive
          toast.error(res.data.message);
        }
      });
  }
//HTML code
  render() {
    return (
      

         
<div>   
  
  {/*<div className="main-banner-2"></div>*/}
  <LandingSlider />
        <div className="row">
          <div className="col-6 p-4 mx-left">
            <img src={Back} alt="" style={{ marginLeft: 80, marginTop: -2, height: 1450, width: 1700 }} />
          </div>
          <div className="col-6 p-4 mx-right ">
            <div className="login-contect py-5">
              <div className="container py-xl-5 py-3">
                <div className="login-body">
                  <div className="login p-4 mx-auto">
                    <h5 className="text-center mb-4">Employee Registeration</h5>
                    <form onSubmit={this.onSubmit} method="post">
                      <div className="form-group">
                        <label>Employee ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_id"
                          value={this.state.employee_id}
                          onChange={this.onChange} //to get inputs from the user we need this
                          placeholder="EMP-000"
                        />
                      </div>
                      <div className="form-group">
                        <label>Name</label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control"
                              name="employee_first_name"
                              value={this.state.employee_first_name}
                              onChange={this.onChange}
                              placeholder="First Name"
                            />
                          </div>

                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control"
                              name="employee_last_name"
                              value={this.state.employee_last_name}
                              onChange={this.onChange}
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Age</label>
                        <input
                          type="number"
                          className="form-control"
                          name="employee_age"
                          value={this.state.employee_age}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>NIC</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_nic"
                          value={this.state.employee_nic}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="employee_dob"
                          value={this.state.employee_dob}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          className="form-control "
                          style={{ borderRadius: 25, height: 50 }}
                          name="employee_gender"
                          value={this.state.employee_gender}
                          onChange={this.onChange}
                        >
                          <option>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_address"
                          value={this.state.employee_address}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_email"
                          value={this.state.employee_email}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>Mobile No</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_phone"
                          value={this.state.employee_phone}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>Post</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_post"
                          value={this.state.employee_post}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>Basic Salary</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_basicSalary"
                          value={this.state.employee_basicSalary}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_username"
                          value={this.state.employee_username}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>

                      <div className="form-group">
                        <label className="mb-2">Password</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_password"
                          value={this.state.employee_password}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-2">Confirm Password</label>
                        <input
                          type="text"
                          className="form-control"
                          name="employee_confirm_password"
                          value={this.state.employee_confirm_password}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>
                      <button type="submit" className="btn submit mb-4">
                        Add Employee
                      </button>
                    </form>
                    <Link to="/">
                      {" "}
                      <button type="submit" className="btn submit mb-4">
                        Go Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <footer className="py-5">
          <div className="container py-xl-4">
            <div className="row footer-top">
              <div className="col-lg-4 footer-grid_section_1its footer-text">
                <h2>
                  <a className="logo text-wh" href="index.html">
                    <img src="{Logo}" alt="" className="img-fluid" />
                    <br />
                    <span></span> PARK AND GO SYSTEM
                  </a>
                </h2>
              </div>
              <div className="col-lg-4 footer-grid_section_1its my-lg-0 my-sm-4 my-4">
                <div className="footer-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="footer-text mt-4">
                  <p>Address : Negombo-Colombo Main Rd, Seeduwa</p>
                  <p className="my-2">Phone : +94- 70 700 0005</p>
                  <p>
                    Email :{" "}
                    <a href="mailto:info@example.com">goandpark@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4 footer-grid_section_1its">
                <div className="footer-title">
                  <h3>Request Info</h3>
                </div>
                <div className="info-form-right mt-4 p-0">
                  <form action="/" method="post">
                    <div className="row">
                      <div className="col-lg-6 form-group mb-2 pr-lg-1">
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 form-group mb-2 pl-lg-1">
                        <input
                          type="text"
                          className="form-control"
                          name="Phone"
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        name="Email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <textarea
                        name="Comment"
                        className="form-control"
                        placeholder="Comment"
                        required
                        defaultValue={""}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn submit-contact ml-auto"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="cpy-right text-center py-3">
          <p>© 2021 PARK AND GO SYSTEM. All rights reserved</p>
        </div>
        <a href="home" className="move-top text-center">
          <span className="fa fa-level-up" aria-hidden="true" />
        </a>
        */}


        
      </div> 

      
    
    );
  } 
}
export default AddEmployee;

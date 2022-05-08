import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
//import Logo from "../../assets/images/logo.png";
//import Back from "../../assets/images/emp2.jpg";
import AddImage from "../../assets/images/add-image-24.png";
import Edit from "../../assets/images/edit-24.png";
import Delete from "../../assets/images/delete-24.png";
import AddEmployee from "./AddEmployee";
import { Navbar, Container } from "react-bootstrap";
import LandingSlider from "../LandingSlider";


class GetAllEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [], // to get employyee list from db
    };
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() { //in react componentDidMount() => is the word using for the retrieve asyncrinous function 
    // showing all the data list when clicking the button  "All employees"
    await axios.get(`${APIURL}/employee/get-all-employee`).then((response) => {
      this.setState({ employeeList: response.data.EmployeeList });
      console.log("EmployeeList =>", this.state.employeeList);

      if (response.data.code === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    });
  }
  //Delete Api
  onDelete(e, id) {
    axios.delete(`${APIURL}/employee/delete-employee/${id}`).then((res) => {
      console.log("res", res);
      if (res.data.code === 200) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    });
  }

  render() {
    return (

      <div>
        
        {/*<div className="main-banner-2"></div>*/}
        <LandingSlider />
        <div className="breadcrumb-agile bg-light py-2 container-fluid">
          <ol className="breadcrumb bg-light m-0">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Get All Employees
            </li>
          </ol>
        </div>

        <Link to="/">

          <button
            type="submit"
            className="col-3 buttons2"

            style={{ backgroundColor: "Tomato", color: "white", width: 200, marginLeft: 1650, marginTop: 30, fontSize: 20 }}>

            Go Back </button> </Link>
        <div className="p-2">
          <h2>Employee List Table</h2>
        </div>

        <br />

        <div className="p-2">
          <table className="table table-hover">


            //<thead className="table-primary">

              <tr>

                <th scope="col"><b><h6>Index</h6></b></th>
                <th scope="col"><b><h6>Employee ID</h6></b></th>
                <th scope="col"><b><h6>Photo</h6></b></th>
                <th scope="col"><b><h6>Employee Name</h6></b></th>
                <th scope="col"><b><h6>Age</h6></b></th>
                <th scope="col"><b><h6>NIC No</h6></b></th>
                <th scope="col"><b><h6>Date of Birth</h6></b></th>
                <th scope="col"><b><h6>Gender</h6></b></th>
                <th scope="col"><b><h6>Address</h6></b></th>
                <th scope="col"><b><h6>Email</h6></b></th>
                <th scope="col"><b><h6>Phone</h6></b></th>
                <th scope="col"><b><h6>Post</h6></b></th>
                <th scope="col"><b><h6>Basic Salary</h6></b></th>
                <th scope="col"><b><h6>User Name</h6></b></th>
                <th scope="col"><b><h6>Password</h6></b></th>
                <th scope="col"><b> <h6>  Manage Employees </h6></b></th>

              </tr>

            </thead>

            <tbody>

              {this.state.employeeList.length > 0 &&
                this.state.employeeList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.employee_id}</td>
                    <td>
                      <img
                        alt="..."
                        src={item.employee_image}
                        style={{ height: 30, width: 30 }}
                        className="avatar avatar-sm rounded-circle me-2"
                      />
                    </td>
                    <td>
                      {/* get the name and last name combinely */}
                      {item.employee_first_name} {item.employee_last_name}
                    </td>
                    <td>{item.employee_age}</td>
                    <td>{item.employee_nic}</td>
                    <td>{item.employee_dob}</td>
                    <td>{item.employee_gender}</td>
                    <td>{item.employee_address}</td>
                    <td>{item.employee_email}</td>
                    <td>{item.employee_phone}</td>
                    <td>{item.employee_post}</td>
                    <td>{item.employee_basicSalary}</td>
                    <td>{item.employee_username}</td>
                    <td>{item.employee_password}</td>
                    <td>
                      <div className="row">
                        <div className="col-4">
                          <Link to={`/upload-employee-image/${item._id}`}> {/* When clicking "+" button link to go */}
                            <button>
                              {" "}
                              <img src={AddImage} alt="" /> {/* Image name for the link = Add image */}
                            </button>
                          </Link>
                        </div>
                        <div className="col-4">
                          <Link to={`/get-emploee-dtails-by-id/${item._id}`}>
                            <button>
                              <img src={Edit} alt="" />{" "}
                            </button>
                          </Link>
                        </div>
                        <div className="col-4">
                          <button
                            onClick={(e) => {
                              if (
                                window.confirm(
                                  "Do you want to delete this employee?"
                                )
                              ) {
                                this.onDelete(e, item._id);
                              }
                            }}
                          >
                            {" "}
                            <img src={Delete} alt="" />
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/*} <br/> <br/>
        <div
        className="col-3 buttons2"
        style={{ marginLeft: 20, marginTop: -40, fontSize: 30 }}
      >
        <Link to="/">
                    <button type="submit" className="btn submit mb-4">
                      Go Back
                    </button>
        </Link>
        <br />
        <br />
        </div> */}


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
export default GetAllEmployee;

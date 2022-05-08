import axios from "axios";
import React, { useEffect, useState } from "react";
import GetAllEmployee from "./GetAllEmployee";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Need to import the css package in react-toastify
import jsPDF from "jspdf";
import "jspdf-autotable";
import { APIURL } from "../../API/environment";
import { Navbar, Container } from "react-bootstrap";
import LandingSlider from "../LandingSlider";

const EmployeeReport = () => { //setting variables for employee list
  const [isLoading, setIsLoading] = useState(true); // If you write a function component and realize you need
                                                   //to add some state to it, useState is used to add React state to function components.
  const [employee, SetEmployee] = useState([]);  //left hand side is the current state and right hand side is the updated state.
  const [baseData, setBaseData] = useState([]);
  const [deleted, setDeleted] = useState(0);

  const doc = new jsPDF("landscape");
//isLoading boolean to show some placeholder
  //By using this below (useEffect) Hook, you tell React that your component needs to do something after render. 
  //React will remember the function you passed (it is refer as our “effect”), and call it later 
  //after performing the DOM updates.

  useEffect(() => { 
    //getting data from EmployeeList
    async function gedData() {
      try {
        const response = await axios.get(`${APIURL}/employee/get-all-employee`);
        if (response.status === 200) {
          SetEmployee(response.data.EmployeeList);
          setBaseData(response.data.EmployeeList);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  const downloadReport = () => {
    doc.text("Employee report", 30, 10);

    let array = [];
    employee.map((item, index) => {
      let row = [];
      row.push(index + 1);
      row.push(item.employee_id);
      row.push(item.employee_first_name + " " + item.employee_last_name);
      row.push(item.employee_age);
      row.push(item.employee_nic);
      row.push(item.employee_dob);
      row.push(item.employee_gender);
      row.push(item.employee_address);
      row.push(item.employee_email);
      row.push(item.employee_phone);
      row.push(item.employee_post);
      row.push(item.employee_basicSalary);
      array.push(row);
      return row;
    });
//Below things should printed in the document
    doc.autoTable({
      head: [
        [
          "#",
          "Employee ID",
          "Employee Name",
          "Age",
          "NIC",
          "DOB",
          "Gender",
          "Address",
          "Email",
          "Phone",
          "Post",
          "Basic Salary",
        ],
      ],

      body: array,
    });

    doc.save("employee.pdf");
    window.location.reload();
  };
  const search = (inp) => {
    if (!inp.target.value) {
      SetEmployee(baseData);
    } else {
      // if(inputvalue === supplierID || inputvalue === supplierName)
      let searchList = baseData.filter(
        (data) =>
          data.employee_id
            .toLowerCase()
            .includes(inp.target.value.toLowerCase()) ||
          data.employee_first_name
            .toLowerCase()
            .includes(inp.target.value.toLowerCase())
      );
      SetEmployee(searchList);
    }
  };
  return (
    
    <div className="MainContainer">
      <header id="home"></header>
      {/* <div className="main-top py-1">
        <div className="container">
          <div className="nav-content">
            <h1>
              <a id="logo" className="logo" href="/">
                <img src="" alt="" style={{ marginLeft: -100 }} />
                PARK AND GO SYSTEM
              </a>
            </h1>

            <div className="nav_web-dealingsls">
              <nav>
                <label htmlFor="drop" className="toggle">
                  Menu
                </label>
                <input type="checkbox" id="drop" />
                <ul className="menu">
                  <li>
                    <a href="/" className="active-page">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/">About Us</a>
                  </li>

                  <li>
                    <a href="/">Contact Us</a>
                  </li>
                  <li>
                    <a href="/">Gallery</a>
                  </li>

                  <li>
                    <a href="/">Our Products</a>
                  </li>
                  <li>
                    <a href="/">Login</a>
                  </li>
                  <li>
                    <Link
                      to="https://w3layouts.com/"
                      target="_blank"
                      className="dwn-button ml-lg-5"
                    ></Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="main-banner-2"></div> */}

      {/* <div className="breadcrumb-agile bg-light py-2">
        <ol className="breadcrumb bg-light m-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            All Employee List
          </li>
        </ol>
      </div> */}
      {/*<div className="main-banner-2"></div>*/}
      <LandingSlider />
      <div className="breadcrumb-agile bg-light py-2 container-fluid">
          <ol className="breadcrumb bg-light m-0">
            <li className="breadcrumb-item">
      <a href="/">Home</a>
    </li>
    <li className="breadcrumb-item active" aria-current="page">
      Download Report
    </li>
  </ol>
</div>
      <div className="p-2">
        <h2>Employee List Table</h2>
      </div>
      

      <div style={{ marginLeft: 900, marginTop: 30, border: 5, }}>
        <input
          type="search"
          placeholder="  Search.."
          name="searchQuery"
          style={{ height: 40, width:300, border: "solid"}}
          onChange={search}
        />
      </div>

{/* Download report button css below */}
      <div>
        <button onClick={downloadReport} type="button" class="btn btn-success" style={{ marginLeft: 50, marginTop: -40}}> Download Report </button>
        <br />
        <br />
      </div>

      <div className="p-2">
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col">Index</th> {/* Table headings (table scope col is used for columns in the table) */}
              <th scope="col">Employee ID</th>
              <th scope="col">Photo</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Age</th>
              <th scope="col">NIC No</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Post</th>
              <th scope="col">Basic Salary</th>
              <th scope="col">User Name</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 &&
              employee.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>  {/* Increasing table data index by 1 */}
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
                    {item.employee_first_name} {item.employee_last_name}
                  </td>
                  <td>{item.employee_age}</td>{/* td means table data */}
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
{/* We mostly use loaders to signal the user that some data is being asynchronously fetched.*/}
{/* isLoading boolean to show some placeholder  when data in our app is loading. 
This is fine - you set isLoading to false, change it to true when data is loading and when data is here - put it back to false.
//isLoading boolean to show some placeholder */}

      {isLoading ? (
        <div className="container text-center py-5">
          <Loader type="Oval" color="#0d6efd" height={30} width={30} />
        </div>
      ) : employee.length > 0 ? (
        <div></div>
      ) : (
        <div className="container text-center py-5">
          <h3>No Employee found</h3>
        </div>
      )}



    </div>
  );
};

export default EmployeeReport;

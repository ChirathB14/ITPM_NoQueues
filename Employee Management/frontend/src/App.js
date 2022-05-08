//Front end routings are done here
import React, { Component }  from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AddEmployee from "./Components/Employees/AddEmployee";
import GetAllEmployee from "./Components/Employees/GetAllEmployee";
import EditEmployeeDetails from "./Components/Employees/EditEmployeeDetails";
import EmployeeHome from "./Components/Employees/EmployeeHome";
import UploadImage from "./Components/Employees/UploadImage";
import EmployeeReport from "./Components/Employees/EmployeeReport";
//import Header1 from "./Components/header/Header";
//import Menu from "./Components/Employees/menu";
//import Menubar from "./Components/Employees/menu2";
//import Slider from "./Components/Employees/slider";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NavBar from './Components/NavBar';



function App() {
  return (
    <div>
       {/* css for toast msg part */}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      
     
      <Router>
      
          
        <Switch>
        <div className="page-container">
          <div className="content-wrap">
          <Header />
          <NavBar />
          {/* Employee Routes */}
          <Route path="/" exact component={EmployeeHome} />
          {/*<Route path="/home" exact component={Home} />*/}
          <Route path="/add-new-employee" exact component={AddEmployee} />  {/*<Route path for add new employee} />*/}
          <Route path="/get-all-employee" exact component={GetAllEmployee} />
          <Route path="/get_report" exact component={EmployeeReport} />
          <Route
            path="/upload-employee-image/:id"
            exact
            component={UploadImage}
          />
          <Route
            path="/get-emploee-dtails-by-id/:id"
            exact
            component={EditEmployeeDetails}
          />
          </div>
            <Footer />
        </div>
        </Switch>
  
      </Router>
      

    
    </div>
  );
}

export default App;

import Header from './components/Header';
import CreateBill from './components/CreateBill';
import SalesView from './components/SalesView'
import OperatorHome from './components/OperatorHome';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SingleBill from './components/SingleBill';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React, { Component } from "react";
import { Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

export default class App extends Component {
  setEmpName = () => {
    // const queryString = window.location.search;
    const queryString = "?employeeName=john";
    console.log(queryString);
    console.log("after queruy");

    const urlParams = new URLSearchParams(queryString);
    const employeeName = urlParams.get("employeeName");
    console.log(employeeName);
  };
  render() {
    return (
      <BrowserRouter>
        <div className="page-container">
          <div className="content-wrap">
            <ToastContainer position="top-center" />
            <Header />
            <NavBar />
            <Route path="/" exact component={OperatorHome}></Route>
            <Route path="/bills" exact component={CreateBill}></Route>
            <Route path="/sales" exact component={SalesView}></Route>
            <Route path="/bills/:id" exact component={SingleBill}></Route>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}


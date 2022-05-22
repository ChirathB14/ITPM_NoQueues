import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreateCustomer from './components/CreateCustomer';
import EditCustomer from './components/EditCustomer';
import CustomerHome from './components/CustomerHome';
import NavBar from './components/NavBar';
import CustomerProfile from './components/CustomerProfile';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderCreate from './components/OrderCreate'
import OrdersView from './components/OrdersView';
import SingleOrder from './components/SingleOrderView';
import CustomerLogIn from './components/CustomerLogIn';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeLogin from './components/EmployeeLogin';


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="page-container">
          <div className="content-wrap">
            <ToastContainer position="top-center" />
            <Header />
            <NavBar />
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/customer/home" exact component={CustomerHome}></Route>
            <Route path="/customer/register" exact component={CreateCustomer}></Route>
            <Route path="/customer/orders/create" exact component={OrderCreate}></Route>
            <Route path="/customer/orders/view" exact component={OrdersView}></Route>
            <Route path="/customer/orders/view/:id" exact component={SingleOrder}></Route>
            <Route path="/customer/login" exact component={CustomerLogIn}></Route>
            <Route path="/employee/login" exact component={EmployeeLogin}></Route>
            <Route path="/customer/profile" exact  component={CustomerProfile}></Route>
            <Route path="/customer/edit" exact component={EditCustomer}></Route>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreateFood from "./components/CreateFood";
import EditFood from "./components/EditFood";
import UserHome from "./components/UserHome";
import NavBar from "./components/NavBar";
import FoodProfile from "./components/FoodProfile";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrdersView from "./components/OrdersView";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FoodListView from "./components/FoodsListView";
import SingleOrderView from "./components/SingleOrderView";

export default class App extends Component {
  render() {
    localStorage.setItem("username", "User1");

    return (
      <BrowserRouter>
        <div className="page-container">
          <div className="content-wrap">
            <ToastContainer position="top-center" />
            <Header />
            <NavBar />
            <Route path="/" exact component={UserHome}></Route>
            <Route path="/register" exact component={CreateFood}></Route>
            <Route path="/edit/:id" exact component={EditFood}></Route>
            <Route
              path="/foodview/:id"
              exact
              component={FoodProfile}
            ></Route>
            <Route path="/land" exact component={LandingPage}></Route>
            <Route path="/order" exact component={OrdersView}></Route>
            <Route path="/foods" exact component={FoodListView}></Route>
            <Route path="/order/:id" exact component={SingleOrderView}></Route>
            
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

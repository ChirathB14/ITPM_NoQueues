import React, { Component } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>Printing Component will be replaced here!</div>;
  }
}

export default class SingleOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
    };
  }

  componentDidMount() {
    this.retrieveOrder();
  }

  retrieveOrder() {
    const id = this.props.match.params.id;

    axios.get(`/orders/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          order: res.data.order,
        });
        console.log(this.state.order);
      }
    });
  }

  goBackToOrders = (e) => {
    this.props.history.push(`/customer/orders/view`);
  };

  getLocalTime(utcdate) {
    const date = new Date(utcdate).toLocaleDateString("en-US");
    const time = new Date(utcdate).toLocaleTimeString("en-US");
    const dateTime = date + " " + time;
    return dateTime;
  }

  render() {
    const { _id, totalPrice, orderItems, createdAt } = this.state.order;
    return (
      <div className="block container ">
        <button
          className="btn btn-warning"
          type="submit"
          style={{ marginBottom: "20px" }}
          onClick={this.goBackToOrders}
        >
          <i className="fa fa-left-long"></i>
          &nbsp; Go Back To Orders
        </button>
        <div
          className="border border-dark container-fluid mb-3 col-11"
          ref={(el) => (this.componentRef = el)}
        >
          <div className="col text-center mt-2">
            <h3>Order Details</h3>
          </div>
          <div className="col">
            <span className="h5">Order ID : </span>{" "}
            {(_id || "").substring(0, 10)}
          </div>
          <div className="col">
            <span className="h5">Created At: </span>
            {this.getLocalTime(createdAt)}
          </div>
          <table className="table table-hover" style={{ marginTop: "5px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item ID</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Price</th>
                <th scope="col" className="text-center">
                  Item Quantity
                </th>
                <th scope="col" className="text-center">
                  Item Total
                </th>
              </tr>
            </thead>
            <tbody>
              {(orderItems || []).map((items, index) => (
                <tr key={index}>
                  <th scope="row"> {index + 1} </th>
                  <td>{items._id.substring(0, 10)}</td>
                  <td>{items.name}</td>
                  <td> LKR {items.price} </td>
                  <td className="text-center"> {items.qty} </td>
                  <td className="text-end">LKR {items.qty * items.price} </td>
                  <td></td>
                </tr>
              ))}
              <tr />
              <tr style={{ borderTop: "5px" }}>
                <td colSpan="5">
                  <h5>Total Amount</h5>
                </td>
                <td className="text-end">
                  <h5>LKR {totalPrice}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container text-end">
          <ReactToPrint
            bodyClass="container-fluid mt-5"
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <a href="#">
                  <button
                    className="btn btn-primary"
                    style={{ width: "20rem" }}
                  >
                    <i className="fa fa-print"></i>&nbsp;&nbsp; Print this order
                    as a PDF File
                  </button>
                </a>
              );
            }}
            content={() => this.componentRef}
          />
        </div>
      </div>
    );
  }
}

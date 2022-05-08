import React, { Component } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>Printing Component will be replaced here!</div>;
  }
}

export default class SingleBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bill: {},
    };
  }

  componentDidMount() {
    this.retrieveBill();
  }

  retrieveBill() {
    const id = this.props.match.params.id;

    axios.get(`/bills/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          bill: res.data.bill,
        });
        console.log(this.state.bill);
      }
    });
  }

  goBackToSales = (e) => {
    this.props.history.push(`/sales`);
  };

  getLocalTime(utcdate) {
    const date = new Date(utcdate).toLocaleDateString("en-US");
    const time = new Date(utcdate).toLocaleTimeString("en-US");
    const dateTime = date + " " + time;
    return dateTime;
  }

  render() {
    const { _id, totalPrice, billItems, createdAt } = this.state.bill;
    return (
      <div className="block container ">
        <button
          className="btn btn-warning"
          type="submit"
          style={{ marginBottom: "20px" }}
          onClick={this.goBackToSales}
        >
          <i className="fa fa-left-long"></i>
          &nbsp; Go Back To Sales
        </button>
        <div
          className="border border-dark container-fluid mb-3 col-11"
          ref={(el) => (this.componentRef = el)}
        >
          <div className="col text-center mt-2">
            <h3>Bill Details</h3>
          </div>
          <div className="col">
            <span className="h5">Bill ID : </span>{" "}
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
              {(billItems || []).map((items, index) => (
                <tr key={index}>
                  <th scope="row"> {index + 1} </th>
                  <td>{items.id.substring(0, 10)}</td>
                  <td>{items.name}</td>
                  <td> LKR {items.price} </td>
                  <td className="text-center"> {items.qty} </td>
                  <td className="text-right">
                    {" "}
                    LKR {items.qty * items.price}{" "}
                  </td>
                  <td></td>
                </tr>
              ))}
              <tr />
              <tr style={{ borderTop: "5px" }}>
                <td colSpan="5">
                  <h5>Total Amount</h5>
                </td>
                <td className="text-right">
                  <h5>LKR {totalPrice}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container text-end">
          <ReactToPrint
            bodyClass="container-fluid mt-5"
            copyStyles="true"
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <a href="#">
                  <button
                    className="btn btn-primary"
                    style={{ width: "20rem" }}
                  >
                    <i className="fa fa-print"></i>&nbsp;&nbsp; Print this bill
                    as a PDF file
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

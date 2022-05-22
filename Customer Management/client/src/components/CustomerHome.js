import React, { Component } from "react";
import axios from "axios";
import CommonSlider from "./Sliders/CommonSlider";

export default class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderIdToDelete: undefined,
      ordersLoading: true,
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }
  
  retrieveOrders() {
    setTimeout(() => {
      axios
      .get(`/customer/${localStorage.getItem("customerID")}/orders`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            orders: res.data.usersExistingOrders,
          });
          console.log(this.state.orders);
          this.setState({orders : this.state.orders.filter(order => {
            return order.status === "Placed" || order.status === "Preparing";
          })});
          console.log(this.state.orders);
            this.setState({ ordersLoading: false });
          }
        });
    }, 500);
  }

  getLocalTime(utcdate) {
    const date = new Date(utcdate).toLocaleDateString("en-US");
    const time = new Date(utcdate).toLocaleTimeString("en-US");
    const dateTime = date + " " + time;
    return dateTime;
  }

  render() {
    return (
      <div className="container">
        <CommonSlider />
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-lg-12 mt-2 mb-2">
            <h4>Ongoing orders</h4>
          </div>
        </div>
        <table
          className="table table-hover"
          style={{ marginTop: "5px" }}
          id="orders-table"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="text-center">
                ID
              </th>
              <th scope="col" className="text-center">
                Created Time
              </th>
              <th scope="col" className="text-center">
                Status
              </th>
              <th scope="col" className="text-center">
                Total Amount (LKR)
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.ordersLoading && (
              <tr>
                <td colSpan="6">
                  <div className="text-center  alert-primary py-3">
                    Loading...
                  </div>
                </td>
              </tr>
            )}
            {this.state.orders.length === 0 && !this.state.ordersLoading && (
              <tr>
                <td colSpan="6">
                  <div className="text-center  alert-secondary py-3">
                    No orders found!
                  </div>
                </td>
              </tr>
            )}
            {this.state.orders.map((orders, index) => (
              <tr key={index}>
                <th scope="row"> {index + 1} </th>
                <td className="text-center">
                  <a
                    href={`/customer/orders/view/${orders._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {orders._id.substring(0, 10)}
                  </a>
                </td>
                <td className="text-center">
                  {this.getLocalTime(orders.createdAt)}
                </td>
                <td className="text-center"> {orders.status} </td>
                <td className="text-center"> {orders.totalPrice} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

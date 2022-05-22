import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Main from "./Main";

export default class OrdersView extends Component {
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
            this.setState({ ordersLoading: false });
          }
        });
    }, 500);
  }

  onDelete = (id) => {
    axios.delete(`/orders/delete/${id}`).then((res) => {
      toast.success("Deleted Successfully!");
      this.retrieveOrders();
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  filterData(orders, searchKey) {
    const result = orders.filter(
      (order) =>
        order.status.toLowerCase().includes(searchKey) ||
        this.getLocalTime(order.createdAt).toLowerCase().includes(searchKey) ||
        order._id.toLowerCase().includes(searchKey) ||
        order.totalPrice.toString().toLowerCase().includes(searchKey)
    );

    this.setState({
      orders: result,
    });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    this.setState({ ordersLoading: true });
    console.log(searchKey);
    axios
      .get(`/customer/${localStorage.getItem("customerID")}/orders`)
      .then((res) => {
        if (res.data.success) {
          this.filterData(res.data.usersExistingOrders, searchKey);
          this.setState({ ordersLoading: false });
        }
      });
  };

  getLocalTime(utcdate) {
    const date = new Date(utcdate).toLocaleDateString("en-US");
    const time = new Date(utcdate).toLocaleTimeString("en-US");
    const dateTime = date + " " + time;
    return dateTime;
  }

  checkStatus(status) {
    return status === "Preparing" || status === "Placed" ? false : true;
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">My Orders</h2>
        <div className="row pt-2">
          <input
            className="form-control"
            type="search"
            placeholder="Search for orders"
            name="searchQuery"
            onChange={this.handleSearchArea}
          ></input>
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
              <th scope="col" className="text-center">
                Action
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
                <td className="text-center">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={this.handleInputChange}
                    value={orders._id}
                    name="orderIdToDelete"
                    disabled={this.checkStatus(orders.status)}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                    &nbsp;Cancel order
                  </button>
                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Cancel Order
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Do you want to cancel order #
                          {(this.state.orderIdToDelete || "").substring(0, 10)}?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            No
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() =>
                              this.onDelete(this.state.orderIdToDelete)
                            }
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right container-fluid">
          <ReactHTMLTableToExcel
            className="btn btn-primary text-right"
            table="orders-table"
            filename={"Orders_Report-" + new Date().toString().substring(0, 24)}
            sheet="Orders"
            buttonText="Export as an excel file"
          />
        </div>
      </div>
    );
  }
}

ReactHTMLTableToExcel.format = (s, c) => {
  if (c && c["table"]) {
    const html = c.table;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const rows = doc.querySelectorAll("tr");

    for (const row of rows) row.removeChild(row.lastChild);

    c.table = doc.querySelector("table").outerHTML;
  }

  return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

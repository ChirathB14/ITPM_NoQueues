import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  async retrieveOrders() {
    axios.get(`/orders`).then((res) => {
      if (res.data.success) {
        this.setState({
          orders: res.data.usersExistingOrders,
        });
        console.log(this.state.orders);
        this.setState({ ordersLoading: false });
      }
    });
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
    axios.get(`/orders`).then((res) => {
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

  async onChangeStatus(event, orderId) {
    try {
      const status = event.target.value;
      this.setState({ ordersLoading: true });
      const response = await axios.post(`/orders/updateStatus/${orderId}`, {
        status,
      });

      if (response.status === 200) {
        toast.success("Successfully Updated!");
        this.retrieveOrders();
      }

      this.setState({ ordersLoading: false });
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Order List</h2>
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
                    href={`/order/${orders._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {orders._id.substring(0, 10)}
                  </a>
                </td>
                <td className="text-center">
                  {this.getLocalTime(orders.createdAt)}
                </td>
                <td className="text-center">
                  <select
                    value={orders.status}
                    onChange={(event) => this.onChangeStatus(event, orders._id)}
                  >
                    <option disabled>Placed</option>
                    <option value={"Preparing"}>Preparing</option>
                    <option value={"Ready"}>Ready</option>
                    <option value={"Rejected"}>Rejected</option>
                  </select>
                </td>
                <td className="text-center"> {orders.totalPrice} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

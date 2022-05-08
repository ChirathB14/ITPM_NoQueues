import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default class SalesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bills: [],
      billIdToDelete: undefined,
      billsLoading: true,
    };
  }

  componentDidMount() {
    this.retrieveBills();
  }

  retrieveBills() {
    setTimeout(() => {
      axios.get("/bills").then((res) => {
        if (res.data.success) {
          this.setState({
            bills: res.data.existingBills,
          });

          console.log(this.state.bills);
          this.setState({ billsLoading: false });
        }
      });
    }, 500);
  }

  onDelete = (id) => {
    axios.delete(`/bills/delete/${id}`).then((res) => {
      toast.success("Deleted Successfully!");
      this.retrieveBills();
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  filterData(bills, searchKey) {
    const result = bills.filter(
      (bill) =>
        bill._id.toLowerCase().includes(searchKey) ||
        this.getLocalTime(bill.createdAt).toLowerCase().includes(searchKey) ||
        bill.totalPrice.toString().toLowerCase().includes(searchKey)
    );

    this.setState({
      bills: result,
    });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    console.log(searchKey);
    this.setState({ billsLoading: true });
    setTimeout(() => {
      axios.get("/bills").then((res) => {
        if (res.data.success) {
          this.filterData(res.data.existingBills, searchKey);
          this.setState({ billsLoading: false });
        }
      });
    }, 200);
  };

  getLocalTime(utcdate) {
    const date = new Date(utcdate).toLocaleDateString("en-US");
    const time = new Date(utcdate).toLocaleTimeString("en-US");
    const dateTime = date + " " + time;
    return dateTime;
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Sales</h2>
        <div className="row pt-2">
          <input
            className="form-control"
            type="search"
            placeholder="Search for sales"
            name="searchQuery"
            onChange={this.handleSearchArea}
          ></input>
        </div>
        <table
          className="table table-hover"
          style={{ marginTop: "5px" }}
          id="sales-table"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Created Time</th>
              <th scope="col">Total Amount</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.billsLoading && (
              <tr>
                <td colSpan="6">
                  <div className="text-center  alert-primary py-3">
                    Loading...
                  </div>
                </td>
              </tr>
            )}
            {this.state.bills.length === 0 && !this.state.billsLoading && (
              <tr>
                <td colSpan="6">
                  <div className="text-center  alert-secondary py-3">
                    No sales found!
                  </div>
                </td>
              </tr>
            )}
            {this.state.bills.map((bills, index) => (
              <tr key={index}>
                <th scope="row"> {index + 1} </th>
                <td>
                  <a
                    href={`/bills/${bills._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {bills._id.substring(0, 10)}
                  </a>
                </td>
                <td>{this.getLocalTime(bills.createdAt)}</td>
                <td> LKR {bills.totalPrice} </td>
                <td className="text-center">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={this.handleInputChange}
                    value={bills._id}
                    name="billIdToDelete"
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
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
                            Delete Bill
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Do you want to delete bill #
                          {(this.state.billIdToDelete || "").substring(0, 10)}?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() =>
                              this.onDelete(this.state.billIdToDelete)
                            }
                          >
                            Delete
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
            table="sales-table"
            filename={"Sales report-" + ((new Date()).toString().substring(0,24))}
            sheet="Sales"
            buttonText= "Export as an excel file"
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

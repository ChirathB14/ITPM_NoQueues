import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default class CustomerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {},
    };
  }

  componentDidMount() {
    axios.get(`/customer/${localStorage.getItem("customerID")}`).then((res) => {
      if (res.data.success) {
        this.setState({
          customer: res.data.customer,
        });
        console.log(this.state.customer);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/customer/delete/${id}`).then((res) => {
      toast.success("Your account deleted successfully");
      setTimeout(() => {
        localStorage.removeItem("customerID");
        localStorage.removeItem("customerName");
        this.props.history.push("/");
      }, 1000);
    });
  };

  render() {
    const { name, nicNumber, phoneNumber, email } = this.state.customer;

    return (
      <div className="container" style={{ marginTop: "40px" }}>
        <div>
          <h4>My Profile</h4>
          <hr />
          <dl className="row">
            <dt className="col-sm-3">Name</dt>
            <dl className="col-sm-9">{name}</dl>

            <dt className="col-sm-3">NIC</dt>
            <dl className="col-sm-9">{nicNumber}</dl>

            <dt className="col-sm-3">Phone Number</dt>
            <dl className="col-sm-9">{phoneNumber}</dl>

            <dt className="col-sm-3">Email</dt>
            <dl className="col-sm-9">{email}</dl>
          </dl>
        </div>

        <div className="container-fluid" style={{ marginTop: "80px" }}>
          <div className="row">
            <div className="col-md-1"></div>

            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-danger col-md-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="far fa-trash-alt"></i>&nbsp;Delete My Profile
            </button>

            <div className="col-md-2">&nbsp;</div>

            <a className="btn btn-warning col-md-4" href={`/customer/edit`}>
              <i className="fas fa-edit"></i>&nbsp;Edit My Profile
            </a>
            <div className="col-md-1"></div>
          </div>
        </div>

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
                  Delete Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Do you want to delete your profile?
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
                  onClick={() => this.onDelete(this.state.customer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

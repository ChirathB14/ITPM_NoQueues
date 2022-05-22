import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const nicRegex = RegExp(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/gm);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === "" && (valid = false);
  });

  return valid;
};

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nicNumber: "",
      phoneNumber: "",
      email: "",
      password: "",
      errors: undefined,
      formErrors: {
        name: "",
        nicNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        if (value.length > 20) {
          formErrors.name = "Name can only have maxmium 20 characters";
        } else if (value.length === 0) {
          formErrors.name = "Name can not be empty";
        } else {
          formErrors.name = "";
        }
        break;
      case "nicNumber":
        if (value.length === 0) {
          formErrors.nicNumber = "NIC can not be empty";
        } else if (!nicRegex.test(value)) {
          formErrors.nicNumber = "Invalid NIC number";
        } else {
          formErrors.nicNumber = "";
        }
        break;
      case "phoneNumber":
        if (value.length > 10) {
          formErrors.phoneNumber =
            "Invalid phone number, only 10 numbers allowed!";
        } else if (value.length === 0) {
          formErrors.phoneNumber = "Phone number can not be empty";
        } else {
          formErrors.phoneNumber = "";
        }
        break;
      case "email":
        if (value.length === 0) {
          formErrors.email = "Email can not be empty";
        } else if (!emailRegex.test(value)) {
          formErrors.email = "Invalid email";
        } else {
          formErrors.email = "";
        }
        break;
      case "password":
        if (value.length === 0) {
          formErrors.password = "Password can not be empty";
        } else if (value.length < 6) {
          formErrors.password = "Minimum 6 characaters required for password";
        } else {
          formErrors.password = "";
        }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmit = async (e) => {
    e.preventDefault();

    if (formValid(this.state)) {

      const { name, nicNumber, phoneNumber, email, password } = this.state;

      const data = {
        name: name,
        nicNumber: nicNumber,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      };

      console.log(data);

      try {
        await axios.put(`/customer/update/${localStorage.getItem("customerID")}`, data).then((res) => {
          if (res.data.success) {
            this.setState({
              name: "",
              nicNumber: "",
              phoneNumber: "",
              email: ""
            });
            toast.success("Profle Update successful!");
            this.props.history.push("/customer/profile");
          }
        });
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error("Profile update Failed! Try Again!");
          this.setState({errors: error.response.data.error} );
          console.log(this.state.errors);
        }
      }
    } else {
      console.error("Please fill the required fields!");
    }
  };

  goBackToProfile = (e) => {
    this.props.history.push(`/customer/profile`);
  };

  componentDidMount() {

    axios.get(`/customer/${localStorage.getItem("customerID")}`).then((res) => {
      if (res.data.success) {
        this.setState({
          name: res.data.customer.name,
          nicNumber: res.data.customer.nicNumber,
          phoneNumber: res.data.customer.phoneNumber,
          email: res.data.customer.email,
          password: res.data.customer.password,
        });

        console.log(this.state.customer);
      }
    });
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="col-md-8 mt-4 mx-auto container">
        <div className="row">
          <div className="col-md-9 ">
            <h1 className="h3 mb-3 font-weight-normal">
              {" "}
              Update Profile Details{" "}
            </h1>
          </div>
          <div className="col-md-3 text-end">
            <button
              className="btn btn-warning"
              type="submit"
              style={{ marginBottom: "20px" }}
              onClick={this.goBackToProfile}
            >
              <i className="fa fa-left-long"></i>
              &nbsp; Back to My Profile
            </button>
          </div>
        </div>
        <form className="needs-validation" onSubmit={this.onSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Name <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="text"
              className={
                formErrors.name.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="name"
              placeholder="Enter name Ex: Amal Perera"
              value={this.state.name}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.name.length > 0 && (
              <span className="errorMessage">{formErrors.name}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              NIC number <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="text"
              className={
                formErrors.nicNumber.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="nicNumber"
              placeholder="Enter NIC number Ex: 123456789123 or 123456789v"
              value={this.state.nicNumber}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.nicNumber.length > 0 && (
              <span className="errorMessage">{formErrors.nicNumber}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Phone Number <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="number"
              className={
                formErrors.phoneNumber.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="phoneNumber"
              placeholder="Enter phone number Ex: 0712345678"
              value={this.state.phoneNumber}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.phoneNumber.length > 0 && (
              <span className="errorMessage">{formErrors.phoneNumber}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Email <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="email"
              className={
                formErrors.email.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="email"
              placeholder="Enter email Ex: amal@gmail.com"
              value={this.state.email}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Password <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="password"
              className={
                formErrors.password.length > 0
                  ? "error form-control"
                  : "form-control"
              }
              name="password"
              placeholder="Enter a password "
              value={this.state.password}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          <div>
            <span style={{ color: "red" }}>* </span> are required fields.
          </div>
          {this.state.errors && (
            <div className="alert alert-danger">{this.state.errors}</div>
          )}
          <div className="row text-end">
            <div className="col">
              <button
                className="btn btn-success"
                type="submit"
                style={{ marginTop: "15px", width: "100%" }}
                disabled={!formValid(this.state)}
              >
                <i className="fa fa-floppy-o"></i>
                &nbsp; Update My Details
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

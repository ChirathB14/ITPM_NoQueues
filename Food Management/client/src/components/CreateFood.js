import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../App.css";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export default class CreateFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      formErrors: {
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
      },
    };
  }

  // handleInputChange = (e) => {
  //     const { name, value } = e.target;

  //     this.setState({
  //         ...this.state,
  //         [name]: value
  //     })
  // }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length > 20 ? "Maximum 20 characters allowed for name!" : "";
        break;
      case "price":
        formErrors.price =
          value.length > 5
            ? "Invalid Price, maximum 5 characters allowed!"
            : "";
        break;
      case "quantity":
        formErrors.quantity =
          value.length > 4
            ? "Invalid Qunatity, maximum 1000 pieces allowed!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      const { name, price, quantity, description, category } = this.state;

      const data = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        category: category,
      };

      console.log(data);

      axios
        .post("/food/save", data)
        .then((res) => {
          if (res.data.success) {
            this.setState({
              name: "",
              price: "",
              quantity: "",
              description: "",
              category: "",
            });
            toast.success("Successfully Added!");
            this.props.history.push("/foods");
          } else {
            alert("Failed!Try Again!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
    console.log(this.state);
  };

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  goBackToLandingPage = (e) => {
    this.props.history.push("/");
  };

  onReset = (e) => {
    this.setState({
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      formErrors: {
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
      },
    });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="col-md-8 mt-4 mx-auto">
        <div className="row">
          <div className="col-md-9 ">
            <h1 className="h3 mb-3 font-weight-normal"> Add New Food Item </h1>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-warning"
              type="submit"
              style={{ marginBottom: "20px" }}
              onClick={this.goBackToLandingPage}
            >
              <i className="fa fa-left-long"></i>
              &nbsp; Go Back
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
              placeholder="Enter the name of food item"
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
              Price (Rs) <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="number"
              className={
                formErrors.price.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="price"
              placeholder="Enter the Price of the item"
              value={this.state.price}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.price.length > 0 && (
              <span className="errorMessage">{formErrors.price}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Qunatity <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="number"
              className={
                formErrors.quantity.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="quantity"
              placeholder="Enter the Quantity you want"
              value={this.state.quantity}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.quantity.length > 0 && (
              <span className="errorMessage">{formErrors.quantity}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Description <span style={{ color: "red" }}>* </span>
            </label>
            <input
              type="text"
              className={
                formErrors.description.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="description"
              placeholder="Enter a Description"
              value={this.state.description}
              noValidate
              onChange={this.handleInputChange}
            />
            {formErrors.description.length > 0 && (
              <span className="errorMessage">{formErrors.description}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Category <span style={{ color: "red" }}>* </span>
            </label>

            {/* <input
              type="text"
              className={
                formErrors.category.length > 0
                  ? "error form-control "
                  : "form-control"
              }
              name="category"
              placeholder="Enter a Category"
              value={this.state.category}
              noValidate
              onChange={this.handleInputChange}
            /> */}

            <select
              className="form-control"
              onChange={(event) => {
                const value = event.target.value;
                this.setState({
                  category: value,
                });
              }}
            >
              <optgroup label="---Choose Category---">
                <option value={"Breakfast"}> Breakfast</option>
                <option value={"Lunch"}> Lunch </option>
                <option value={"Dinner"}> Dinner </option>
              </optgroup>
            </select>

            {formErrors.category.length > 0 && (
              <span className="errorMessage">{formErrors.category}</span>
            )}
          </div>
          <div>
            <span style={{ color: "red" }}>* </span> are required fields.
          </div>
          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            <i className="far fa-check-square"></i>
            &nbsp; Add food item
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-warning"
            type="reset"
            style={{ marginTop: "15px" }}
            onClick={this.onReset}
          >
            <i className="fa fa-eraser"></i>
            &nbsp; Clear form
          </button>
        </form>
      </div>
    );
  }
}

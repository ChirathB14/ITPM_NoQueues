import React, { Component } from "react";
import axios from "axios";

export default class CustomerProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/food/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          food: res.data.food,
        });
        console.log(this.state.food);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/food/delete/${id}`).then((res) => {
      this.props.history.push("/");
    });
  };

  render() {
    const { name, price, quantity, description, category } = this.state.food;

    return (
      <div className="container" style={{ marginTop: "40px" }}>
        <div>
          <h4>Food Item</h4>
          <hr />
          <dl className="row">
            <dt className="col-sm-3">Name</dt>
            <dl className="col-sm-9">{name}</dl>

            <dt className="col-sm-3">Price</dt>
            <dl className="col-sm-9">{price}</dl>

            <dt className="col-sm-3">Quantity</dt>
            <dl className="col-sm-9">{quantity}</dl>

            <dt className="col-sm-3">Description</dt>
            <dl className="col-sm-9">{description}</dl>

            <dt className="col-sm-3">Category</dt>
            <dl className="col-sm-9">{category}</dl>
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
              <i className="far fa-trash-alt"></i>&nbsp;Delete Food Item
            </button>

            <div className="col-md-2">&nbsp;</div>

            <a
              className="btn btn-warning col-md-4"
              href={`/edit/${this.state.food._id}`}
            >
              <i className="fas fa-edit"></i>&nbsp;Edit Food Item
            </a>

            {/* <a className="btn btn-danger" href="#" onClick={() => this.onDelete(this.state.customer._id)}>
            <i className="far fa-trash-alt"></i>&nbsp;Delete My Profile
          </a> */}

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
                  Delete Food Item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Do you want to delete this item?</div>
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
                  onClick={() => this.onDelete(this.state.food._id)}
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

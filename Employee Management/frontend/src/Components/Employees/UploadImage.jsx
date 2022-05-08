import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
//import Logo from "../../assets/images/logo.png";
import Back from "../../assets/images/emp2.jpg";
import { Navbar, Container } from "react-bootstrap";
import LandingSlider from "../LandingSlider";

const initialState = {
  image: null,
};

class UploadImage extends Component {
  constructor(props) { //props is used for passing data from one component to another. it is readonly child component can't chg it
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this); //onChange.bind and .onSubmit.bind are like put methods(pass data)
    this.onFileChange = this.onFileChange.bind(this);
  }
// below What I want to achieve is when the user press choosefile and chooses an image file, js would save the image file in the 
//directory and use it. 
  onFileChange = (event) => { //On file select (from the pop up) 
    this.setState({ image: event.target.files[0] }); //  here it is  Updating the state
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
//updating Image part
  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", this.state.image); //Here it is passing form data. Here the default image url is updating when inserting a new image.
//updating the url of the default image
    axios
      .put(
        `${APIURL}/employee/upload-image/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.setTimeout(function () { // The setTimeout function is a native JavaScript function. 
            window.location.href = "/get-all-employee"; //It sets a timer (a countdown set in milliseconds) 
          }, 2000);             //for an execution of a callback function, calling the function upon completion of the timer.
        } else {          //Here all employee list wiil be received
          toast.error(res.data.message);
        }
      });
  }
//html code
  render() {
    return (
      <div>
        {/*<div className="main-banner-2"></div>*/}
        <LandingSlider />
        <div className="breadcrumb-agile bg-light py-2 container-fluid">
          <ol className="breadcrumb bg-light m-0">
            <li className="breadcrumb-item">
      <a href="/">Home</a>
    </li>
    <li className="breadcrumb-item active" aria-current="page">
      Upload Employee Image
    </li>
  </ol>
</div>
          <div className="row">
          <div className="col-6 p-4 mx-left">
            <img src={Back} alt="" style={{ height: 500, width: 1500 }} />
          </div>
          <div className="col-6 p-4 mx-right ">
            <div className="login-contect py-5">
              <div className="container py-xl-5 py-3">
                <div className="login-body">
                  <div className="login p-4 mx-auto">
                    <h5 className="text-center mb-4">Upload Employee Image</h5> {/* Upload image part html */}
                    <form onSubmit={this.onSubmit} method="post">
                      <div className="form-group">
                        <label>Images</label>
                        <input
                          type="file" 
                          name="image"
                          accept="image/*"
                          onChange={this.onFileChange}
                          className="form-control form-control-user"
                          required
                        />
                      </div>
                      <button type="submit" className="btn submit mb-4">
                        Upload Image
                      </button>
                    </form>
                    <Link to="/get-all-employee">
                      <button type="submit" className="btn submit mb-4">
                        Go Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*
        <footer className="py-5">
          <div className="container py-xl-4">
            <div className="row footer-top">
              <div className="col-lg-4 footer-grid_section_1its footer-text">
                <h2>
                  <a className="logo text-wh" href="index.html">
                    <img src="{Logo}" alt="" className="img-fluid" />
                    <br />
                    <span></span> PARK AND GO SYSTEM
                  </a>
                </h2>
              </div>
              <div className="col-lg-4 footer-grid_section_1its my-lg-0 my-sm-4 my-4">
                <div className="footer-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="footer-text mt-4">
                  <p>Address : Negombo-Colombo Main Rd, Seeduwa</p>
                  <p className="my-2">Phone : +94- 70 700 0005</p>
                  <p>
                    Email :{" "}
                    <a href="mailto:info@example.com">goandpark@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4 footer-grid_section_1its">
                <div className="footer-title">
                  <h3>Request Info</h3>
                </div>
                <div className="info-form-right mt-4 p-0">
                  <form action="/" method="post">
                    <div className="row">
                      <div className="col-lg-6 form-group mb-2 pr-lg-1">
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 form-group mb-2 pl-lg-1">
                        <input
                          type="text"
                          className="form-control"
                          name="Phone"
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        name="Email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <textarea
                        name="Comment"
                        className="form-control"
                        placeholder="Comment"
                        required
                        defaultValue={""}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn submit-contact ml-auto"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
        </footer>
        <div className="cpy-right text-center py-3">
          <p>© 2021 PARK AND GO SYSTEM. All rights reserved</p>
        </div>
        <a href="home" className="move-top text-center">
          <span className="fa fa-level-up" aria-hidden="true" />
        </a>
        */}



      </div>


    );
  }
}
export default UploadImage;

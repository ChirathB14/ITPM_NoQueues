import { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EmpLogin = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/employee/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("employeeID", res.data.id);
      localStorage.setItem("employeeName", res.data.name);
      localStorage.setItem("type", res.data.post);
      switch (localStorage.getItem("type")) {
        case "Admin":
          window.location = "http://localhost:3002?employeeName="+localStorage.getItem("employeeName")+ "&login=success";
          break;
        case "Food Operator":
          window.location = "http://localhost:3004?employeeName="+localStorage.getItem("employeeName")+ "&login=success";
          break;
        case "Bill Operator":
          window.location = "http://localhost:3006?employeeName="+localStorage.getItem("employeeName")+ "&login=success";
          break;
        default:
          break;
      }
      toast.success("Login successful!");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
      }
    }
  };

  const goBackToLandingPage = () => {
    props.history.push("/");
  };

  return (
    <div className="container col-8" style={{ marginTop: "10vh" }}>
      <div className="row">
        <div className="col-md-9 ">
          <h1 className="h3 mb-3 font-weight-normal">
            {" "}
            Log in to your account{" "}
          </h1>
        </div>
        <div className="col-md-3 text-end">
          <button
            className="btn btn-warning"
            type="submit"
            style={{ marginBottom: "20px" }}
            onClick={goBackToLandingPage}
          >
            <i className="fa fa-left-long"></i>
            &nbsp; Go Back
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="form-control"
          />
        </Form.Group>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="container text-center mt-4">
          <button type="submit" className="btn btn-success col-10">
            Log In
          </button>
        </div>
      </form>
      <hr className="mt-4" />
      <div className="row text-center mt-4">
        <div className="col">
          <span className="h5">Not Registered yet?</span>
          &nbsp;Please contact site administrator for employee registration.
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;

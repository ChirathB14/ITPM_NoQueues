// import React, {  useEffect, useRef, useState } from "react";
import React from "react";
// import axios from "axios";
import CommonSlider from "./Sliders/CommonSlider";
// import ReactToPrint from "react-to-print";

const UserHome = () => {
  // const [foods, setFoods] = useState([]);

  // const printTable = useRef(null);

  // function retrieveFoods() {
  //   axios.get("/food").then((res) => {
  //     if (res.data.success) {
  //       setFoods(res.data.existingFoods);

  //       console.log(foods);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   retrieveFoods();
  // }, []);

  // const onDelete = (id) => {
  //   axios.delete(`/post/delete/${id}`).then((res) => {
  //     alert("Deleted successfully");
  //     retrieveFoods();
  //   });
  // };
  

  return (
    <div className="container">
      <div className="row pt-2">
        <div className="col">
          <a href="/register" style={{ textDecoration: "none", color: "white" }}>
            <button
              className="btn btn-primary container-fluid "
              style={{ height: "5rem" }}
            >
              <h2>Add new food item</h2>
            </button>
          </a>
        </div>
        <div className="col">
          <a href="/order" style={{ textDecoration: "none", color: "white" }}>
            <button
              className="btn btn-primary container-fluid"
              style={{ height: "5rem" }}
            >
              <h2>Set order state</h2>
            </button>
          </a>
        </div>
      </div>
      <CommonSlider />
      {/* <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-lg-12 mt-2 mb-2">
          <h4>Food List</h4>
        </div>

        <div class="col-md-12 bg-light text-right">
          <ReactToPrint
            trigger={() => (
              <button type="button" class="btn btn-primary float-end">
                Generate Report
              </button>
            )}
            content={() => printTable.current}
          />
        </div>
      </div>
      <table
        ref={printTable}
        className="table table-hover"
        style={{ marginTop: "5px" }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Food Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quntity</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((foods, index) => (
            <tr key={index}>
              <th scope="row"> {index + 1} </th>
              <td>
                <a
                  href={`/food/${foods._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {foods.name}
                </a>
              </td>
              <td> {foods.price} </td>
              <td> {foods.quantity} </td>
              <td> {foods.description} </td>
              <td> {foods.category} </td>
              <td>
                {" "}
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => onDelete(foods._id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/*<button className="btn btn-success">
      <a href="/land" style={{ textDecoration: "none", color: "white" }}>
        Landing page
      </a>
        </button>*/}
{/* 
      <button
        className="btn btn-success"
        style={{ marginTop: "50px", padding: "10px", height: "10vh" }}
      >
        <a
          href="/register"
          style={{ textDecoration: "none", color: "white", fontSize: "24px" }}
        >
          Add New Food Item &nbsp;&nbsp;
          <i className="fa fa-user-plus fa-lg" aria-hidden="true"></i>
        </a>
      </button>

      <button
        className="btn btn-secondary float end"
        style={{ height: "10vh", padding: "10px" }}
      >
        <a
          href="/order"
          style={{ textDecoration: "none", color: "white", fontSize: "24px" }}
        >
          Set Order state&nbsp;&nbsp;
          <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>
        </a>
      </button> */}
    </div>
  );
};

export default UserHome;

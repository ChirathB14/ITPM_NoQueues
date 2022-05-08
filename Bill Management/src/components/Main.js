import React from "react";
import Product from "./Product";
import { Row } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export default function Main(props) {
  const { products, onAdd } = props;
  const [sproducts, setProducts] = useState(products);

  const filterData = (sProducts, searchKey) => {
    setProducts(
      sProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchKey) ||
          product.price.toString().includes(searchKey)
      )
    );
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    console.log(searchKey);
    filterData(products, searchKey);
  };


  return (
    <div className="container card-deck">
      <h2 className="text-center">Products</h2>
      <div className="row pt-2">
        <input
          className="form-control"
          type="search"
          placeholder="Search for products"
          name="searchQuery"
          onChange={handleSearchArea}
        ></input>
      </div>
      <Row style={{ marginTop: "20px" }}>
        {sproducts.length === 0 && (
          <div className="text-center  alert-warning py-3">
            No prodcuts found.
          </div>
        )}
        {sproducts.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </Row>
    </div>
  );
}

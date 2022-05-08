import React from "react";

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div
      className="card text-center"
      style={{ width: "10rem", marginTop: "10px" }}
    >
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div className="mt-3">
          <strong>LKR {product.price} </strong>
        </div>
      </div>
      <div
        className="card-footer"
        style={{ backgroundColor: "white", width: "9rem" }}
      >
        <button className="btn btn-warning" onClick={() => onAdd(product)}>
          Add To Bill
        </button>
      </div>
    </div>
  );
}

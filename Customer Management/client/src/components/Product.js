import React from "react";

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div
      className="card text-center"
      style={{ width: "10rem", marginTop: "8px" }}
    >
      <div className="card-body">
        <p className="card-title">
          <strong>{product.name}</strong>
        </p>
        <div className="mt-1">
          <strong>LKR {product.price} </strong>
        </div>
        <p className="card-text text-muted small ">{product.description}</p>
        <strong>Category:</strong> {product.category}
      </div>
      <div
        className="card-footer"
        style={{ backgroundColor: "white", width: "9rem" }}
      >
        <button className="btn btn-warning" onClick={() => onAdd(product)}>
          Add to order
        </button>
      </div>
    </div>
  );
}

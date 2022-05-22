import React from "react";
import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Main from "./Main";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CreateBill(props) {
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [billSaving, setBillSaving] = useState(undefined);

  const retrieveProducts = () => {
    axios
      .get(`/food`)
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data.products);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  const itemsPrice = cartItems.reduce(
    (total, current) => total + current.qty * current.price,
    0
  );
  const totalPrice = itemsPrice;

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const onSubmit = (billItems, totalPrice) => {
    setTimeout(() => {
      const data = {
        billItems: billItems,
        totalPrice: totalPrice,
      };

      console.log(data);

      axios.post("/bills/save", data).then((res) => {
        if (res.data.success) {
          setCartItems([]);
          setBillSaving(true);
          setTimeout(() => {
            setBillSaving(false);
            toast.success("Bill successfully created!");
          }, 200);
        } else {
          toast.error("Bill create failed!");
        }
      });
    }, 200);
  };

  const onDelete = (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
  };

  return (
    <div className="block container">
      <Row>
        <Col>
          <div className="container">
            {products && <Main products={products} onAdd={onAdd}></Main>}
          </div>
        </Col>
        <Col>
          <h2 className="text-center">Bill Items</h2>
          <div className="container mt-4">
            {cartItems.length === 0 && !billSaving && (
              <div className="text-center  alert-danger py-3">
                Bill is currently empty.
              </div>
            )}
            {billSaving && (
              <div className="text-center  alert-warning py-3">
                Bill is saving..
              </div>
            )}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="row container"
                style={{ paddingTop: "10px" }}
              >
                <div className="col-3">{item.name}</div>
                <div className="col-5" align="center">
                  <button
                    onClick={() => onRemove(item)}
                    className="btn btn-danger remove text-center"
                  >
                    -
                  </button>{" "}
                  <button
                    onClick={() => onAdd(item)}
                    className="btn btn-primary add text-center"
                  >
                    +
                  </button>{" "}
                  &nbsp;&nbsp;
                  <button
                    onClick={() => onDelete(item)}
                    className="btn btn-danger delete text-center"
                  >
                    Remove
                  </button>
                </div>

                <div className="col-4 text-right">
                  {item.qty} x LKR {parseFloat(item.price)}
                </div>
              </div>
            ))}

            {cartItems.length !== 0 && (
              <div>
                <hr />
                <div className="row container">
                  <div className="col-3">
                    <strong>Total Price</strong>
                  </div>
                  <div className="col-3 text-right">
                    <strong>LKR{totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <button
                    onClick={() => onSubmit(cartItems, totalPrice)}
                    className="btn btn-success text-center"
                  >
                    Create Bill
                  </button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

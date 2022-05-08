const express = require("express");
const Orders = require("../models/order");

const router = express.Router();

//save an order
router.post("/orders/save", (req, res) => {
  let newOrder = new Orders(req.body);

  newOrder.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "Order saved successfully",
    });
  });
});

//get all Orders
router.get("/orders", (req, res) => {
  Orders.find().exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingOrders: orders,
    });
  });
});

//get a specific order
router.get("/orders/:id", (req, res) => {
  let orderId = req.params.id;

  Orders.findById(orderId, (err, order) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  });
});

//update order
router.put("/orders/update/:id", (req, res) => {
  Orders.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Updated successfully!",
      });
    }
  );
});

//delete an Order
router.delete("/orders/delete/:id", (req, res) => {
  Orders.findByIdAndRemove(req.params.id).exec((err, deletedOrder) => {
    if (err) {
      return res.status(400).json({
        message: "Delete failed",
        err,
      });
    }
    return res.status(200).json({
      message: "Order Delete success",
      deletedOrder,
    });
  });
});

//retrieve orders of a customer
router.get("/customer/:id/orders", (req, res) => {
  let id = req.params.id;

  Orders.find({ userId: id }).exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      usersExistingOrders: orders,
    });
  });
});


module.exports = router;

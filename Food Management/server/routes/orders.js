const express = require("express");
const Orders = require("../models/order");

var ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

//save an order
router.post("/save", (req, res) => {
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
router.get("/", (req, res) => {
  Orders.find().exec((err, orders) => {
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

// update order status
router.post("/updateStatus/:id", (req, res) => {
  const body = req.body;
  const status = body["status"];
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Order ID",
    });
  }

  if (
    status !== "Preparing" &&
    status !== "Placed" &&
    status !== "Ready" &&
    status !== "Rejected"
  ) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  Orders.updateOne(
    {
      _id: id,
    },
    {
      status: status,
    },
    (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Successfully Updated!",
      });
    }
  );
});

//get a specific order
router.get("/:id", (req, res) => {
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
router.put("/update/:id", (req, res) => {
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
router.delete("/delete/:id", (req, res) => {
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
router.get("/customer/:id", (req, res) => {
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

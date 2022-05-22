const express = require("express");
const { Customers, validate } = require("../models/customer");
const bcrypt = require("bcrypt");

const router = express.Router();

//save a customer
router.post("/customer/save", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const customer = await Customers.findOne({ email: req.body.email });
    if (customer)
      return res
        .status(409)
        .send({ error: "Customer with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Customers({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ success: "User created successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }

  // let newCustomer = new Customers(req.body);

  // newCustomer.save((err) => {
  //     if (err) {
  //         return res.status(400).json({
  //             error: err
  //         });
  //     }

  //     return res.status(200).json({
  //         success: "Account created successfully"
  //     });
  // });
});

//get customers
router.get("/customers", (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ error: error.details[0].message });

  Customers.find().exec((err, customers) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingCustomers: customers,
    });
  });
});

//update a customer
router.put("/customer/update/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const customer = await Customers.findOne({ email: req.body.email });

    if (customer) {
      if (customer._id.toString() != req.params.id) {
        return res
          .status(409)
          .send({ error: "Customer with given email already Exist!" });
      }
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    Customers.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        password: hashPassword,
      },
      (err, customer) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        return res.status(200).json({
          success: "Account updated successfully!",
        });
      }
    );
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//delete a customer
router.delete("/customer/delete/:id", (req, res) => {
  Customers.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Delete failed",
        err,
      });
    }
    return res.status(200).json({
      message: "Delete success",
      deletedPost,
    });
  });
});

//get a specific customer
router.get("/customer/:id", (req, res) => {
  let customerId = req.params.id;

  Customers.findById(customerId, (err, customer) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      });
    }

    return res.status(200).json({
      success: true,
      customer,
    });
  });
});
module.exports = router;

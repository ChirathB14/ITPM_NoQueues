const router = require("express").Router();
const { Customers } = require("../models/customer");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/customer/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ error: error.details[0].message });

    const customer = await Customers.findOne({ email: req.body.email });
    if (!customer)
      return res.status(401).send({ error: "Invalid Email!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      customer.password
    );
    if (!validPassword)
      return res.status(401).send({ error: "Invalid Password!" });
      
    const token = customer.generateAuthToken();
    res.status(200).send({ data: token, success: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;

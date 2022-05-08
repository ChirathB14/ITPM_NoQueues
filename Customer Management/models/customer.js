const mongoose = require("mongoose");
const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// const passwordComplexity = require("joi-password-complexity");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nicNumber: { type: String,required: true, },
  phoneNumber: {type: String,required: true,},
  email: {type: String,required: true,},
  password: {type: String,required: true,},
});

customerSchema.methods.generateAuthToken = function () {
  // const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
  //   expiresIn: "7d",
  // });
  const token = { id:this._id, name:this.name };
  return token;
};

const Customers = mongoose.model("Customers", customerSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    nicNumber: Joi.string().required().label("NIC number"),
    phoneNumber: Joi.string().required().label("Phone Number"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Customers, validate };

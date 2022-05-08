//All codes related to mongo DB
const mongoose = require("mongoose");
//EmployeeSchema is an object
const EmployeeSchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      trim: true, //Trim is used to remove unneccessary space 
    },
    employee_first_name: {
      type: String,
      trim: true,
    },
    employee_last_name: {
      type: String,
      trim: true,
    },
    employee_age: {
      type: String,
      trim: true,
    },
    employee_nic: {
      type: String,
      trim: true,
    },
    employee_dob: {
      type: String,
      trim: true,
    },
    employee_gender: {
      type: String,
      trim: true,
    },
    employee_address: {
      type: String,
      trim: true,
    },
    employee_email: {
      type: String,
      trim: true,
    },
    employee_phone: {
      type: String,
      trim: true,
    },
    employee_post: {
      type: String,
      trim: true,
    },
    employee_basicSalary: {
      type: Number,
      trim: true,
    },
    employee_username: {
      type: String,
      trim: true,
    },
    employee_password: {
      type: String,
      trim: true,
    },
    employee_image: {
      type: String,
      trim: true,
      //Default image
      default:
        "https://images.unsplash.com/photo-1610271340738-726e199f0258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
    },
  },
  {
    //create and update "create Time and create date" in mongo db
    timestamps: {
      type: Date,
      default: Date.now, //Taking the current date
    },
  }
);

module.exports = mongoose.model("employee", EmployeeSchema); //public access 
//Here "employee" is the Table name given in mong DB


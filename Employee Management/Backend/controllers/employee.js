const Employee = require("../model/employee.model");
const cloudinary = require("../utils/cloudinary");

const EmployeeControllers = {
  //object
  addEmplyee: async (req, res) => {
    //Data sent from the API is catched from here
    try {
      const {
        //These are the attributes needed to get the details for the form
        employee_id,
        employee_first_name,
        employee_last_name,
        employee_age,
        employee_nic,
        employee_dob,
        employee_gender,
        employee_address,
        employee_email,
        employee_phone,
        employee_post,
        employee_basicSalary,
        employee_username,
        employee_password,
        employee_confirm_password,
      } = req.body; //request sent from the body is catched from here

      if (
        //can't be null data //checking whether the data is null or not
        !employee_id ||
        !employee_first_name ||
        !employee_last_name ||
        !employee_age ||
        !employee_nic ||
        !employee_dob ||
        !employee_gender ||
        !employee_address ||
        !employee_email ||
        !employee_phone ||
        !employee_post ||
        !employee_basicSalary ||
        !employee_username ||
        !employee_password ||
        !employee_confirm_password
      ) {
        //If the data is not null = 200(means success)
        return res.status(200).json({
          //If the data is null
          code: 400, //Bad request
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }
      //validation of email
      if (!validateEmail(employee_email)) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Email is invalid, Please enter a valid email",
        });
      }
      //asyronous function //- "await" keyword will ask the execution to wait until the defined task gets executed
      //Checking whether there is a employee with the same id //validation part
      const employeeId = await Employee.findOne({ employee_id });
      if (employeeId) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request", //error
          message: `This ${employeeId.employee_id} id already registered.`,
        });
      }
      //Checking whether there are employees with same first name and same last name
      const employeeFirstName = await Employee.findOne({ employee_first_name }); // 2 people can't be the same name
      const employeeLastName = await Employee.findOne({ employee_last_name });
      if (employeeFirstName && employeeLastName) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${employeeFirstName.employee_first_name} ${employeeLastName.employee_last_name} is already registered employee.`,
        });
      }

      //Checking whether there are employees with the same phone no
      const employeePhone = await Employee.findOne({ employee_phone }); // can't have the same phone no for 2 people
      if (employeePhone) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This phone already exist.",
        });
      }
      //Checking whether there are employees with the same email
      const employeeEmail = await Employee.findOne({ employee_email });
      if (employeeEmail) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This Email already registered.",
        });
      }
      //Checking whether the employee entered password is same as the confirm password  data
      if (employee_confirm_password != employee_password) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Confirm paswword does not match with password.",
        });
      }
      //Add employee part backend
      //data need to be store in the DB
      const newEmployee = new Employee({
        employee_id,
        employee_first_name,
        employee_last_name,
        employee_age,
        employee_nic,
        employee_dob,
        employee_gender,
        employee_address,
        employee_email,
        employee_phone,
        employee_post,
        employee_basicSalary,
        employee_username,
        employee_password,
      });

      await newEmployee.save(); // save() => This is the function used to save the data in the Database
      //If the data is successfully added to the Database, status 200 will be returned
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        EmployeeDetails: newEmployee,
        message: "Registration was successfully Done.",
      });
    } catch (error) {
      //If the data is not successfully saved in the DB the error will be catched using catch(error) => Statement
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  //Retrieve all details - backend

  getAllEmployees: async (req, res) => {
    try {
      const allEmployees = await Employee.find(); //we use just "find" keyword  to take all the employee list at once

      if (!allEmployees) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeList: allEmployees,
          message: "Employee list not found.",
        });
      } else {
        //If all the employee-list get retrieved
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeList: allEmployees,
          message: "All employee list recieved.",
        });
      }
    } catch (error) {
      //catching the error
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
  //receive data from one person using id by poping up a msg
  //eg -: "Kasuni jayasekara's details received msg" coming when clicking edit button (pencil icon)
  getEmployeeById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const EmployeeDetails = await Employee.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeDetails: EmployeeDetails,
          message: `${EmployeeDetails.employee_first_name} ${EmployeeDetails.employee_last_name}'s'  details recieved.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  uploadImage: async (req, res) => {
    try {
      //Since in Mongo DB we cannot store images i have use cloudinary platform to save the employee images.
      //Here req.file.path is the path of the image in mongo DB
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "EmployeeList", //The folder name that i have used in Cloudinary
      });
      //Here it is finding the employee by id and updating the relevant image for that employee.
      if (req.params && req.params.id) {
        await Employee.findByIdAndUpdate(req.params.id, {
          employee_image: result.secure_url,
        });

        const uploadImage = await Employee.findById(req.params.id);
        //Code for checking successfully upload or not succesfully uploaded msg
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateEmployee: uploadImage,
          message: "Image uploaded successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  // Update part - Backend
  updateEmployeeDetails: async (req, res) => {
    //Data updated from the API is catched from here
    try {
      //These attributes are needed to update the details of the form
      if (req.params && req.params.id) {
        const {
          employee_id,
          employee_first_name,
          employee_last_name,
          employee_age,
          employee_nic,
          employee_dob,
          employee_gender,
          employee_address,
          employee_email,
          employee_phone,
          employee_post,
          employee_basicSalary,
          employee_username,
          employee_password,
          employee_confirm_password,
        } = req.body; //request sent to update from the body is catched from here

        if (!validateEmail(employee_email)) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "Email is invalid, Please enter a valid email",
          });
        }

        if (employee_confirm_password != employee_password) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "Confirm paswword does not match with password.",
          });
        }
        // Show employee details on response
        const updateEmployee = await Employee.findById(req.params.id);
        // Here it is showing the the details relavant to the specific employee using his id
        //and can do the necessary updatings to that specific employee
        //Below are the attributes needed for that.
        await Employee.findByIdAndUpdate(req.params.id, {
          employee_id,
          employee_first_name,
          employee_last_name,
          employee_age,
          employee_nic,
          employee_dob,
          employee_gender,
          employee_address,
          employee_email,
          employee_phone,
          employee_post,
          employee_basicSalary,
          employee_username,
          employee_password,
        });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateEmployee: updateEmployee,
          message:
            updateEmployee.employee_first_name +
            ""  +
            updateEmployee.employee_last_name +
            " is updated successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  //Delete Employee part - backend
  deleteEmployee: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeDetails: employee,
          message:
            employee.employee_first_name +
            "" +
            employee.employee_last_name +
            " is deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = EmployeeControllers;

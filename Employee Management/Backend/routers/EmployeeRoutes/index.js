//For routings
//all the get,put,delete,post methods are here
const routes = require("express").Router();
const EmployeeRoutes = require("../../controllers/employee");
const upload = require("../../utils/multer");

routes.post("/add-new-employee", EmployeeRoutes.addEmplyee);

routes.get("/get-all-employee", EmployeeRoutes.getAllEmployees);

routes.get("/get-employee/:id", EmployeeRoutes.getEmployeeById); //receive data from one person using id when editing msg come

routes.put(
  "/upload-image/:id",
  upload.single("image"), //1 image can be uploaded
  EmployeeRoutes.uploadImage
);

routes.put( //for updating we are using put method
  "/update-employee-details/:id",
  EmployeeRoutes.updateEmployeeDetails
);

routes.delete("/delete-employee/:id", EmployeeRoutes.deleteEmployee);

module.exports = routes;

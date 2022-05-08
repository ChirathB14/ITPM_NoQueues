//All the routes - backend
const routes = require("express").Router();
const EmployeeMainRoute = require("./EmployeeRoutes");

routes.use("/employee", EmployeeMainRoute);

module.exports = routes;

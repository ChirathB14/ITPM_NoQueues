const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//import routes
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders");
const customerAuthRoutes = require("./routes/customerAuth");
const employeeAuthRoutes = require("./routes/employeeAuth");

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(customerRoutes);
app.use(orderRoutes);
app.use(customerAuthRoutes);
app.use(employeeAuthRoutes);

const PORT = 8000;
const DB_URL =
  "mongodb+srv://root:root@cluster1.v01tq.mongodb.net/NoQueues?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => console.log("Database connection error ", err));

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});

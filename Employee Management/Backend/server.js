const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors"); //Helps to Enable scripts running on a browser client to interact with resources from a different origin.
const bodyParser = require("body-parser"); //Need this dependency to catch data which were coming from the frontend
const routes = require("./routers");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8002; //Backend port
const URI = process.env.MONGO_URL;

mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});

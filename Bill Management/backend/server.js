const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const billRoutes = require('./routes/bills');
const productRoutes = require('./routes/products');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(billRoutes);
app.use(productRoutes);

const PORT = 8006;
// const DB_URL = 'mongodb+srv://root:root@cluster1.v01tq.mongodb.net/billTest?retryWrites=true&w=majority';
const DB_URL =
  "mongodb+srv://root:root@cluster1.v01tq.mongodb.net/NoQueues?retryWrites=true&w=majority";

mongoose.connect(DB_URL)
    .then(() => {
        console.log('DB connected!');
    })
    .catch((err) => console.log('Database connection error ', err));

app.listen(PORT, () => {
    console.log('App is running on ' + PORT);
});
//Database-Server
//Adding API Methods by importing MERN npm packages
var Express=require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

//Create an instance of an Express app
var app=Express();
app.use(cors());  //Adds cors module
console.log("Here we go")

//Adding routes for connection to front-end
app.get('/', (req, res) => {
  res.send('this is the root node'); 
});

const usersRoute = require('./routes/users.js');
const productsRoute = require('./routes/products.js');

app.use('/users', usersRoute)
app.use('/products', productsRoute)

const port = 3000;

app.listen(port, () => {
  console.log('Node.js HTTP server is running on port ' + port);
});
//

//Create a connection with the MongoDB
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://Admin:lCNavxtIML74MxCj@josies-list-cluster.o5u3b.mongodb.net/?retryWrites=true&w=majority&appName=josies-list-cluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
  res.send('The server works!!');
});

// Start the server
const port2 = process.env.PORT || 3000;
app.listen(port, 3000)

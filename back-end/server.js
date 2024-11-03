//Database-Server
//Adding API Methods by importing MERN npm packages
const express=require("express");
const mongoose = require('mongoose');
const cors=require("cors");
const multer=require("multer");
const app = express();
//Create an instance of an Express app
app.use(cors());  


//Adding routes for connection to front-end
// app.get('/', (req, res) => {
//   res.send('this is the root node'); 
// });

const usersRoute = require('./routes/users.js');
const productsRoute = require('./routes/products.js');

app.use('/users', usersRoute)
app.use('/products', productsRoute)

// // const port = 3000;

// app.listen(port, () => {
//   console.log('Node.js HTTP server is running on port ' + port);
// });
// //

//Create a connection with the MongoDB

// MongoDB connection
mongoose.connect('mongodb+srv://Admin:lCNavxtIML74MxCj@josies-list-cluster.o5u3b.mongodb.net/?retryWrites=true&w=majority&appName=josies-list-cluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
  res.send('The server works!!');
});

// Start the server
const port = process.env.PORT || 5038;
app.listen(port, 5038)

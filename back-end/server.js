//Database-Server
//Adding API Methods by importing MERN npm packages
require('dotenv').config()
const express=require("express");
const mongoose = require('mongoose');
const cors=require("cors");
const multer=require("multer");
const app = express();
app.use(cors());  
const Product = require('./models/Product.js'); 

//Create a connection with the MongoDB

// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
  
//const usersRoute = require('./routes/users.js');
//const productsRoute = require('./routes/products.js');

//app.use('/users', usersRoute)
//app.use('/products', productsRoute)

// // const port = 3000;


// Define routes
// app.get('/api', (req, res) => {
//   res.json({message: 'Hello from Server!'});
// });

const port = process.env.PORT || 5038;
// only listen for requests if successfully connected
mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log('Server started on port ' + port);
    const testItem = new Product();
    testItem.set('itemName', 'Coffee Table');
    testItem.set('price', 5); 
    testItem.save()
      .then(savedItem => console.log("Item Saved: ", savedItem.itemName))
      .catch(err => console.log("Error Saving: ", err))
    console.log(testItem); 
  })
});




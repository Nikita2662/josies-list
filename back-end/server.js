require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./models/User.js'');
//const Product = require('./models/Product.js'); 
const Products = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
app.use('/products', require('./routes/productRoutes'));
app.use("/user", require('./routes/users')); 


// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// only listen for requests if successfully connected
mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log('Server started on port ' + port);
    let testUser = new User({userID: 'testemail@g.ucla.edu'});


    // const testItem = new Product();
    // testItem.set('itemName', 'Coffee Table');
    // testItem.set('price', 5); 
    // testItem.save()
    //   .then(savedItem => console.log("Item Saved: ", savedItem.itemName))
    //   .catch(err => console.log("Error Saving: ", err))
    // console.log(testItem); 
  })
});

module.exports = app; 




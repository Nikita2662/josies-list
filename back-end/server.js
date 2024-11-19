require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const Product = require('./models/Product.js'); 
const Comment = require('./models/Comment.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
app.use('/', require('./routes/productRoutes'));
app.use('/', require('./routes/commentRoutes'));


// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// only listen for requests if successfully connected
mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log('Server started on port ' + port);
    //const testItem = new Product();
    //testItem.set('itemName', 'Coffee Table');
    //testItem.set('price', 5); 
    //testItem.set('seller', 'Sarah');
    //testItem.set('description', 'the key description');
    //testItem.save()
    //  .then(savedItem => console.log("Item Saved: ", savedItem.itemName))
    //  .catch(err => console.log("Error Saving: ", err))
    //console.log(testItem); 
  })
});

module.exports = app; 




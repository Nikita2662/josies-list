require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');

const User = require('./models/User.js'); // DELETE LATER after testing

//const Product = require('./models/Product.js'); 
//const Products = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
//app.use('/products', require('./routes/productRoutes'));
app.use("/", userRoutes);


// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// only listen for requests if successfully connected
mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log('Server started on port ' + port);
    
    // USER TESTING WITH direct creation of a user -- works
    /* let testUser = new User({
                            user_id: 'testemail@g.ucla.edu',
                            username: 'joe bruin'
                            });

    testUser.save()
        .then((doc) => {console.log(doc);})
        .catch((err) => {console.error(err);}); */


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




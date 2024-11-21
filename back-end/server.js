require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const Product = require('./models/Product.js'); 
const Comment = require('./models/Comment.js');

const app = express();
const port = process.env.PORT || 5038;

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
    const testItem = new Product();
    testItem.set('itemName', 'Coffee Table');
    testItem.set('price', 5); 
    testItem.set('seller', 'Sarah');
    testItem.set('description', 'the key description');
    testItem.save()
      .then(savedItem => console.log("Item Saved: ", savedItem.itemName))
      .catch(err => console.log("Error Saving: ", err))
    console.log(testItem); 

    const commentItem = new Comment({
      user: 'John Doe',  // The name of the comment author
      content: 'This is a great product! I highly recommend it.',  // The content of the comment
      productID: testItem._id  // Link this comment to the testItem (product) by using the product's _id
  });
   // Link this comment to the testItem (product) by using the product's _id
        commentItem.save()
          .then(savedComment => console.log("Comment Saved: ", savedComment.content))
          .catch(err => console.log("Error Saving Comment: ", err));
        console.log(commentItem);  
        const commentItem2 = new Comment();
        commentItem2.set('user', 'Krisha Basrur');  // The name of the comment author
        commentItem2.set('content', 'I think this product is really great in terms of quality');  // The content of the comment
        commentItem2.set('productID', testItem._id);  // Link this comment to the testItem (product) by using the product's _id
        commentItem2.save()
          .then(savedComment2 => console.log("Comment Saved: ", savedComment2.content))
          .catch(err => console.log("Error Saving Comment: ", err));
        console.log(commentItem2);   

  })
});

module.exports = app; 

/*  const commentItem = new Comment();

// Set properties of the comment
    commentItem.set('authorName', 'John Doe');  // The name of the comment author
    commentItem.set('content', 'This is a great product! I highly recommend it.');  // The content of the comment
    commentItem.set('productID', testItem._id);  // Link this comment to the testItem (product) by using the product's _id
    commentItem.save()
      .then(savedComment => console.log("Comment Saved: ", savedComment.content))
      .catch(err => console.log("Error Saving Comment: ", err));
    console.log(savedContent);  */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product.js");
const Comment = require("./models/Comment.js");

const userRoutes = require("./routes/user-routes");
const User = require("./models/User.js");

//const Product = require('./models/Product.js');
//const Products = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 5038;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
//app.use('/products', require('./routes/productRoutes'));
app.use("/", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// only listen for requests if successfully connected
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
});

module.exports = app;

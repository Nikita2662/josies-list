require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product.js");
const Comment = require("./models/Comment.js");

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes");
const commentRoutes = require("./routes/commentRoutes");  


const app = express();
const port = process.env.PORT || 5038;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", commentRoutes);  

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
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

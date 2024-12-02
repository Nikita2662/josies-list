const express = require("express");
const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;
const { checkDuplicateProduct } = require("../controllers/productController");

const productRoutes = express.Router();

// 1- Search for products
productRoutes.route("/search").get(async (req, res) => {
  const { SearchQuery, tags } = req.query;
  try {
    const query = [];
    if (SearchQuery) {
      query.push(
        { itemName: { $regex: SearchQuery, $options: "i" } },
        { description: { $regex: SearchQuery, $options: "i" } }
      );
    }

    const tagsQuery = [];
    if (tags) {
      const tagsArray = tags.split(",");
      tagsQuery.push({ tags: { $in: tagsArray } });
    }

    let data = await Product.find({ $or: query, $and: tagsQuery });

    if (data.length > 0) {
      res.json(data).status(200);
    } else {
      res.status(200).json("No matching products found.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2 - Retrieve all
productRoutes.route("/products").get(async (req, res) => {
  let data = await Product.find({});

  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(400).send({
      status: false,
      message: "Error: Products were not found",
    });
  }
});

// 3 - Retrieve one
productRoutes.route("/products/:id").get(async (req, res) => {
  let data = await Product.findOne({ _id: new ObjectId(req.params.id) });

  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    res.status(400).send({
      status: false,
      message: "Error: Product does not exist",
    });
  }
});

// 3.25 - Send in new bid (BUYER)
// Front-end should send bid and bidder_email upon button click
productRoutes.route("/products/:id/bid").put(async (req, res) => {
  let bid = req.body.bid;
  let bidder = req.body.bidder_email;

  if (bid <= 0) { // bid is invalid: should be positive
    res.status(400).send({
      status: false,
      message: "Bid must be a positive value.",
    });
  }
  
  else { // bid is valid
    try { // if bid is higher than current highest_bid, update
      let result = await Product.updateOne({
        _id: req.params.id,
        highest_bid: { $lt: bid}
      },
      { 
        $set: {
          highest_bid: bid,
          highest_bidder: bidder
        }}
      )

      res.status(201).send({
        status: true,
        message: "Bid sent successfully."
      })
    } catch (error) {
      res.status(400).send({
        status: false,
        message: error, 
      });
    }
  }
});

// 3.5 - Retrieve highest bid for a given product (SELLER)
// (includes bidder email)
// if -1, means no bids yet
productRoutes.route("/products/:id/viewbids").get(async (req, res) => {
  
});

// 4 - Retrieve all products under a specific user
productRoutes.route("/products/user/:id").get(async (req, res) => {
  let products = await Product.find({ seller_email: req.params.id });

  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(400).send({
      status: false,
      message: "User does not have any products",
    });
  }
});

// 5 - Create one + Check Duplicate
productRoutes.route("/products").post(async (req, res) => {
  const isNotNewProduct = await checkDuplicateProduct(req.body);
  if (isNotNewProduct.duplicate) {
    return res.json({
      success: false,
      message: "This product already exists",
    });
  }

  let productObject = {
    itemName: req.body.itemName,
    description: req.body.description,
    tags: req.body.tags,
    price: req.body.price,
    image: req.body.image,
    seller_name: req.body.seller_name,
    seller_email: req.body.seller_email,
  };
  let data = await Product.create(productObject);
  res.json(data);
});

// 6 - Update One
productRoutes.route("/products/:id").put(async (req, res) => {
  let productObject = {
    $set: {
      itemName: req.body.itemName,
      description: req.body.description,
      tags: req.body.tags,
      price: req.body.price,
      image: req.body.image,
      seller_name: req.body.seller_name,
      seller_email: req.body.seller_email,
    },
  };
  let data = await Product.updateOne(
    { _id: new ObjectId(req.params.id) },
    productObject
  );
  res.json(data);
});

// 7 - Delete One
productRoutes.route("/products/:id").delete(async (req, res) => {
  let data = await Product.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});
module.exports = productRoutes;

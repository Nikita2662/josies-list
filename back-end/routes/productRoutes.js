const express = require("express");
const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;
const { checkDuplicateProduct } = require("../controllers/productController");

const productRoutes = express.Router();

// Search for products
productRoutes.route("/search").get(async (req, res) => {
  const { SearchQuery, tags } = req.query;
  try {
    const orQuery = [];
    if (SearchQuery) {
      orQuery.push(
        { itemName: { $regex: SearchQuery, $options: "i" } },
        { description: { $regex: SearchQuery, $options: "i" } }
      );
    }

    const andQuery = [];
    if (tags) {
      const tagsArray = tags.split(",");
      andQuery.push({ tags: { $in: tagsArray } });
    }

    andQuery.push({ sold: false });

    let data = await Product.find({ $or: orQuery, $and: andQuery });

    if (data.length > 0) {
      res.json(data).status(200);
    } else {
      res.status(200).json("No matching products found.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all products
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

// Retrieve products that have not been sold
productRoutes.route("/products/notsold").get(async (req, res) => {
  let products = await Product.find({ sold: false });

  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(400).send({
      status: false,
      message: "No products left to sell",
    });
  }
});

// Retrieve one product by id
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

// Send in new bid (BUYER)
// Get bid and bidder_email upon button click from front-end
productRoutes.route("/products/:id/bid").put(async (req, res) => {
  let bid = req.body.bid;
  let bidder = req.body.bidder_email;

  if (bid < 0) {
    // bid is invalid: should be positive
    res.status(400).send({
      status: false,
      message: "Bid must be a positive value.",
    });
  } else {
    // bid is valid
    try {
      // if bid is higher than current highest_bid, update
      let result = await Product.updateOne(
        {
          _id: req.params.id,
          highest_bid: { $lt: bid },
        },
        {
          $set: {
            highest_bid: bid,
            highest_bidder: bidder,
          },
        }
      );

      res.status(201).send({
        status: true,
        message: "Bid sent successfully.",
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: error,
      });
    }
  }
});

// Retrieve highest bid and bidder for a given product (SELLER)
// if highest bid is returned as -1, that means there are no bids yet
productRoutes.route("/products/:id/viewbid").get(async (req, res) => {
  let bid = await Product.findOne(
    { _id: req.params.id },
    { highest_bid: 1, highest_bidder: 1, _id: 0 }
  );

  if (bid != null) res.send(bid).status(200);
  else
    res.status(400).send({
      // ERROR HANDLING
      status: false,
      message:
        "Error retrieving highest bid, possibly this product may have been created before bidding feature was set",
    });
});

// SELLER marks product as sold
productRoutes.route("/products/:id/acceptbid").put(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { sold: true },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(updatedProduct);
});

// Retrieve all products under a specific user
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

// Create one + Check Duplicate
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
    sold: req.body.sold,
  };
  let data = await Product.create(productObject);
  res.json(data);
});

// Update a product
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
      sold: req.body.sold,
    },
  };
  let data = await Product.updateOne(
    { _id: new ObjectId(req.params.id) },
    productObject
  );
  res.json(data);
});

// Delete a product by id
productRoutes.route("/products/:id").delete(async (req, res) => {
  let data = await Product.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});
module.exports = productRoutes;

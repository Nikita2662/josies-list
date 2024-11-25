const express = require("express");
const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;

const productRoutes = express.Router();

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
      res.json(data);
    } else {
      res.status(404).json("No matching products found.");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// 1 - Retrieve all
productRoutes.route("/products").get(async (req, res) => {
  let data = await Product.find({});

  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("Error: Data was not found.");
  }
});

// 2 - Retrieve one
productRoutes.route("/products/:id").get(async (req, res) => {
  let data = await Product.findOne({ _id: new ObjectId(req.params.id) });

  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Error: Data was not found.");
  }
});

//3 - Retrieve all products for a user
productRoutes.route("/products/user/:id").get(async (req, res) => {
  let products = await Product.find({ seller: req.params.id });

  if (products.length > 0) {
    res.json(comments);
  } else {
    throw new Error("Error: Products for user not found");
  }
});

// 4 - Create one
productRoutes.route("/products").post(async (req, res) => {
  let productObject = {
    itemName: req.body.itemName,
    description: req.body.description,
    tags: req.body.tags,
    price: req.body.price,
    image: req.body.iamge,
    seller: req.body.seller,
  };
  let data = await Product.create(productObject);
  res.json(data);
});

// 5 - Update One
productRoutes.route("/products/:id").put(async (req, res) => {
  let productObject = {
    $set: {
      itemName: req.body.itemName,
      description: req.body.description,
      tags: req.body.tags,
      price: req.body.price,
      image: req.body.image,
      seller: req.body.seller,
    },
  };
  let data = await Product.updateOne(
    { _id: new ObjectId(req.params.id) },
    productObject
  );
  res.json(data);
});

// 6 - Delete One
productRoutes.route("/products/:id").delete(async (req, res) => {
  let data = await Product.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

module.exports = productRoutes;

const express = require('express');
const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;

const productRoutes = express.Router();


// 1 - Retrieve all 
productRoutes.route("./products").get(async (req, res) => {
    let productDB = Product; 
    let data = await Product.find({}).toArray(); 

    if (data.length > 0) {
        res.json(data);
    } else {
        throw new Error("Error: Data was not found.");
    }
});

// 2 - Retrieve one
productRoutes.route("./products/:id").get(async (req, res) => {
    let productDB = Product; 
    let data = await Product.findOne({_id: new ObjectId(req.params.id)}).toArray(); 

    if (Object.keys(data).length > 0) {
        res.json(data);
    } else {
        throw new Error("Error: Data was not found.");
    }
});

// 3 - Create one
productRoutes.route("./products").post(async (req, res) => {
    let productDB = Product; 
    let productObject = {
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price,
        seller: req.body.seller
    }
    let data = await Product.insertOne(productObject); 
    res.json(data);
});

/* // 3.5 - Add Bid
productRoutes.route("./products/:id").put(async (req, res) => {
    let data = await Product.findByIdAndUpdate(
        req.params.id, 
        {highestBid: ()}
    )
}) */

serDB.findByIdAndUpdate(req.params.id, req.body, { new: true }) // will return the new user object to postman

        .then(() => {
            res.status(201).send({
                status: true,
                message: "User updated successfully",
            });
        })
        .catch((err) => {
            res.status(400).send({
                status: false,
                message: "Error updating user",
            });
        });

// 4 - Update One
productRoutes.route("./products/:id").put(async (req, res) => {
    let productDB = Product; 
    let productObject = { 
        $set: {
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            seller: req.body.seller
        } 
    }
    let data = await Product.updateOne({_id: new ObjectId(req.params.id)}, productObject); 
    res.json(data);
});

// 5 - Delete One 
productRoutes.route("./products/:id").delete(async (req, res) => {
    let productDB = Product; 
    let data = await Product.deleteOne({_id: new ObjectId(req.params.id)}).toArray(); 
    res.json(data); 
});

// 4 - Create one
productRoutes.route("/products").post(async (req, res) => {
  let productObject = {
    itemName: req.body.itemName,
    description: req.body.description,
    tags: req.body.tags,
    price: req.body.price,
    image: req.body.image,
    seller: req.body.seller,
  };
  let data = await Product.create(productObject);
  res.json(data);
});

module.exports = productRoutes; 
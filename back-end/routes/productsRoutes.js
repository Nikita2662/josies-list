const express = require('express');
const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;

const productRoutes = express.Router();


// 1 - Retrieve all 
postRoutes.route("./posts").get(async (req, res) => {
    let productDB = Product; 
    let data = await Product.find({}).toArray(); 

    if (data.length > 0) {
        res.json(data);
    } else {
        throw new Error("Error: Data was not found.");
    }
});

// 2 - Retrieve one
postRoutes.route("./posts/:id").get(async (req, res) => {
    let productDB = Product; 
    let data = await Product.findOne({_id: new ObjectId(req.params.id)}).toArray(); 

    if (Object.keys(data).length > 0) {
        res.json(data);
    } else {
        throw new Error("Error: Data was not found.");
    }
});

// 3 - Create one
postRoutes.route("./posts").post(async (req, res) => {
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

// 4 - Update One
postRoutes.route("./posts/:id").put(async (req, res) => {
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
postRoutes.route("./posts/:id").delete(async (req, res) => {
    let productDB = Product; 
    let data = await Product.deleteOne({_id: new ObjectId(req.params.id)}).toArray(); 
    res.json(data); 
});

module.exports = postRoutes; 
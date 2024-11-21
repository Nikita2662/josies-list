const express = require('express');
const Product = require('../models/Product');
const ObjectId = require('mongodb').ObjectId;

const productRoutes = express.Router();


// 1 - Get Products by Search
productRoutes.route("/search").get(async (req, res) => {
    const {SearchQuery, tags} = req.query;
    try {
        const query = []
        if(SearchQuery) {
            query.push(

            { itemName: { $regex: SearchQuery, $options: 'i' } },
            { description: { $regex: SearchQuery, $options: 'i' } }
            )
        }

        if(tags) {
            const tagsArray = tags.split(',')
            query.push( { tags: { $in: tagsArray } } )
        }

        let data = await Product.find({ $or: query });

        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json("No matching products found.");
        }

    } catch (error) {
        res.status(404).json({message: error.message})
    }
    
});

// 2 - Retrieve all 
productRoutes.route("/products").get(async (req, res) => {
    let data = await Product.find({}); 

    if (data.length > 0) {
        res.json(data);
    } else {
        throw new Error("Error: Data was not found.");
    }
});

// 3 - Retrieve one
productRoutes.route("/products/:id").get(async (req, res) => {
    let data = await Product.findOne({_id: new ObjectId(req.params.id)}); 

    if (Object.keys(data).length > 0) {
        res.json(data);
    } else {
        throw new Error("Error: Data was not found.");
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
        seller: req.body.seller
    }
    let data = await Product.insertOne(productObject); 
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
            seller: req.body.seller
        } 
    }
    let data = await Product.updateOne({_id: new ObjectId(req.params.id)}, productObject); 
    res.json(data);
});

// 6 - Delete One 
productRoutes.route("/products/:id").delete(async (req, res) => {
    let data = await Product.deleteOne({_id: new ObjectId(req.params.id)}); 
    res.json(data); 
});



module.exports = productRoutes; 
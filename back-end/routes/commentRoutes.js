const express = require('express');
const Comment = require('../models/Comment');
const ObjectId = require('mongodb').ObjectId;

const commentRoutes = express.Router();

// Get all comments for a product
commentRoutes.route("/comments/all/:id").get(async (req, res) => {
    let comments = await Comment.find({ productID: req.params.id });
    if (comments.length > 0) {
        res.json(comments); 
    }   else {
        // If no comments are found, send an empty array (for products that dont have a commment)
        res.json([]);  
        
    }
    
});

// Get a comment by id
commentRoutes.route("/comments/:id").get(async (req, res) => {
    let data = await Comment.findOne({_id: new ObjectId(req.params.id)}); 

    if (Object.keys(data).length > 0) {
        res.json(data);
    } else {
        console.log("Error in retreiving comment");
    }
});

// Create a comment for a Product
commentRoutes.route("/comments").post(async (req, res) => {
    let commentObject = {
        user: req.body.user,
        content: req.body.content,
        productID: req.body.productID
    }
    let data = await Comment.create(commentObject);
    res.json(data);
});

// Update a comment by id
commentRoutes.route("/comments/:id").put(async (req, res) => {
    let commentObject = { 
        $set: {
            user: req.body.user,
            content: req.body.content,
            productID: req.body.productID
        } 
    }
    let data = await Comment.updateOne({_id: new ObjectId(req.params.id)}, commentObject); 
    res.json(data);
});

// Delete a comment
commentRoutes.route("/comments/:id").delete(async (req, res) => {
    let data = await Comment.deleteOne({_id: new ObjectId(req.params.id)}); 
    res.json(data); 
});

module.exports = commentRoutes; 

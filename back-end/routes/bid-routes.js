const express = require('express');
const router = express.Router(); // instance of Express router
const bidDB = require("../models/Bid"); // import model!

// send in new bid (BUYER uses this)
router.route("./products/:id").post(async (req, res) => {
    bidDB.create({
        product_id: req.params._id, // store product ID
        buyer_id: req.body.buyer_id, // store buyer email
        bid_value: req.body.bid_value // store bid value
    })
        .then(() => {
            res.status(201).send({
                status: true,
                message: "Bid sent successfully",
            })
            
        })
})



// Google auth --> create new user and set _id and picture (as well as username temporarily) --> TO FRONT-END: just provide id (email) and Google profile picture
router.route("/users").post(async (req, res) => {
    userDB.create({
        _id: req.body._id,
        username: req.body._id, // username is set to email as well, for now
        picture: req.picture // picture is set to the user's Google profile picture, for now
      })
          .then(() => {
              res.status(201).send({
                  status: true,
                  message: "User added successfully",
              });
          })
          .catch((err) => {
              res.status(400).send({
                  status: false,
                  message: "Error adding user",
              });
          });
  })

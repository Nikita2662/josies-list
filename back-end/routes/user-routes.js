const express = require('express');
const router = express.Router(); // instance of Express router
const userDB = require("../models/User"); // import model!

// get all users
router.route("/users").get(async (req, res) => {
  let collection = await userDB.find({}); // find without query finds all
  res.send(collection).status(200);
})

// get a specific user by id (email) --> email provided in route
router.route("/users/:id").get(async (req, res) => {
  let user = await userDB.findOne({ _id: req.params.id })

  if (user != null) res.send(user).status(200); // if user not null, FOUND
  else res.status(400).send({ // ERROR HANDLING
      status: false,
      message: "Error retrieving user"
  });
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

// upon Create New Account completion --> finish creating new user, ie. add username, name, profile picture, and bio (PROVIDE EMAIL IN ROUTE, username name pfp and bio in request body)
router.route("/users/:id").post(async (req, res) => {
    userDB.findByIdAndUpdate(req.params.id, req.body, { new: true }) // will return the new user object to postman

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
})

module.exports = router; 
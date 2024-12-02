const express = require("express");
const router = express.Router(); // instance of Express router
const userDB = require("../models/User"); // import model!

// get all users
router.route("/users").get(async (req, res) => {
  let collection = await userDB.find({}); // find without query finds all
  res.send(collection).status(200);
});

// get a specific user by id (email) --> email provided in route
router.route("/users/:id").get(async (req, res) => {
  let user = await userDB.findOne({ _id: req.params.id });

  if (user != null) res.send(user).status(200); // if user not null, FOUND
  else
    res.status(400).send({
      // ERROR HANDLING
      status: false,
      message: "Error retrieving user",
    });
});

// GOOGLE AUTH - send in Google photo and verified email
// creates new user and adds to database (id, picture, and temp username)
router.route("/users").post(async (req, res) => {
  userDB
    .create({
      _id: req.body._id,
      username: req.body.username,
      picture: req.body.picture,
      bio: req.body.bio,
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
        message: err.message,
      });
    });
});

// EDIT USER or CREATE NEW ACC - send in all fields the user has filled in (username, name, profile picture, and/or bio) in request body. Provide email in route
router.route("/users/:id").put(async (req, res) => {
  userDB
    .findByIdAndUpdate(req.params.id, req.body, { new: true }) // will return the new user object to postman

    .then(() => {
      res.status(201).send({
        status: true,
        message: "User updated successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: "Error updating user's data",
      });
    });
});

// Delete a user by ID
router.route("/users/:id").delete(async (req, res) => {
  userDB
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).send({
        status: true,
        message: "User deleted successfully (or never existed)", // If we want to throw error if user doesn't exist, change to implement with https://stackoverflow.com/questions/57121449/how-do-i-give-document-does-not-exist-feedback-to-the-user-when-using-the-mong
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: "Error deleting user",
      });
    });
});

module.exports = router;

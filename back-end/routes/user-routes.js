const express = require("express");
const router = express.Router(); // instance of Express router
const userDB = require("../models/User"); // import model!

// const ObjectId = require("mongodb").ObjectId; // delete this line

// get all users
router.route("/users").get(async (req, res) => {
  let collection = await userDB.find({}); // find without query finds all
  res.send(collection).status(200);
});

// get a specific user by id (email) --> email provided in route
router.route("/users/:id").get(async (req, res) => {
  let user = await userDB.findOne({ _id: req.params.id });

  //  .byEmail(req.params._id); // DELETE (appended to findOne)

  //if (!user) res.send("Not found").status(404);
  res.send(user).status(200);
});

/* DELETE THIS IF ABOVE WORKS
// get a specific user by id (email)
router.get("/:id", async(req, res) => {
    let collection = await db.collection("users");
    let query = { email: new ObjectId(req.params.email) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
}); */

// Google auth --> create new user and set _id (as well as username temporarily) --> TO FRONT-END: just provide id (email)
router.route("/users").post(async (req, res) => {
  userDB
    .create({
      _id: req.body._id,
      username: req.body._id, // username is set to email as well, for now
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
});

//TEMPORARY
router.route("/users/del").delete(async (req, res) => {
  userDB
    .deleteOne({ _id: req.body._id })
    .then(() => {
      res.status(200).send({
        status: true,
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: "Error deleting user",
      });
    });
});

// upon Create New Account completion --> finish creating new user, ie. add username and bio (PROVIDE EMAIL IN ROUTE, username and bio in request body)
router.route("/users/:id").post(async (req, res) => {
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
        message: "Error updating user",
      });
    });
});

module.exports = router;

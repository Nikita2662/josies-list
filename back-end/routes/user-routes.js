const express = require('express');
const router = express.Router(); // instance of Express router
const userDB = require("../models/User"); // import model!

// const ObjectId = require("mongodb").ObjectId; // delete this line

// get all users
router.route("/users").get(async(req, res) => {
    let collection = await userDB.find({}); // find without query finds all
    res.send(collection).status(200);
})

// get a specific user by id (email)
router.route("/users/:id").get(async(req, res) => {
    let user = await userDB.findOne().byEmail(req.params.user_id);

    //if (!user) res.send("Not found").status(404);
    res.send(user).status(200);
})

/*
// get a specific user by id (email)
router.get("/:id", async(req, res) => {
    let collection = await db.collection("users");
    let query = { email: new ObjectId(req.params.email) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
}); */

/*
// Google auth --> create new user with user_id set to their email
router.route("/users").post(async(req, res) => {
    userDB.create({
        user_id: req.body.user_id,
        username: req.body.username,
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
            message: "Error adding user",
        });
    }); 
}) */

// finish creating new user, upon Create New Account (front-end)
router.route("/users/:id").post(async(req, res) => {
    userDB.create({
        user_id: req.body.user_id,
        username: req.body.username,
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
            message: "Error adding user",
        });
    }); 
})

module.exports = router; 
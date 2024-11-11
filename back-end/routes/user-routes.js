const express = require('express');
const router = express.Router(); // instance of Express router
const userDB = require("../models/User"); // import model!

const ObjectId = require("mongodb").ObjectId;

// get all users
router.route("/users").get(async(req, res) => {
    let collection = await userDB.find({}); // find without query finds all
    res.send(collection).status(200);
})

// create a new user, upon Create New Account (front-end)
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
})

/*
// get a specific user by id (email)
router.get("/:id", async(req, res) => {
    let collection = await db.collection("users");
    let query = { email: new ObjectId(req.params.email) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Add a new user to database (use upon create account)
router.post("/", async (req, res) => {
    try {
        await userDB
            .create({
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
    } catch (err) {
        res.status(500).send ({
            status: false,
            message: "Server error while adding user",
        });
    }
}); */


module.exports = router; 
// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.controller.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Importing sequelize models
const db = require("../models");
const User = db.users;
const Authentication = db.authentications;
const Op = db.Sequelize.Op;

// Create and save a new user to the database
exports.create = async (req, res) => {
    // If the req parameters are not inputted the create will fail and
    // the caller is notified
    if (
        !req.body.email ||
        !req.body.fName ||
        !req.body.lName ||
        !req.body.password
    ) {
        res.status(400).send({
            message: "You must have both a first and last name.",
        });
        return;
    }

    // Initializing user data
    let user = {
        fName: req.body.fName,
        lName: req.body.lName,
        pNum: req.body.pNum,
        email: req.body.email,
    };

    // Initializing authentication data
    const userAuthentication = {
        password: req.body.password,
        permId: req.body.permId,
    };

    // Checking to make sure the user does not already exist in the
    // database
    await User.findOne({ where: { email: user.email } })
        .then((user) => {
            // If the user exists a response is sent
            if (user !== null) {
                res.status(400).send({
                    message: `The ${user.email} is already registered. Choose another.`,
                });
            }
        })
        .catch((err) => {
            // If there is an error a response is sent
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while checking the user email.",
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Creating a new authentication row for the new user
    const newAuth = await Authentication.create(userAuthentication)
        .then((data) => {
            // The new data is returned
            return data;
        })
        .catch((err) => {
            // If there is an error a response is sent
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while adding user authentication.",
            });
        });

    // If a response was sent the method is terminated
    if (res.headersSent) {
        return;
    }

    // Adding the authentication Id to the user data to
    // create the new user
    user = {
        ...user,
        authId: newAuth.authId,
    };

    // Creating the new user in the database
    await User.create(user)
        .then((data) => {
            // The new user data is sent back
            //********DO NOT SENT NEW AUTH DATA-TESTING */
            res.send({ data, newAuth });
        })
        .catch((err) => {
            // An error response is sent if there is an error
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the user.",
            });
        });
};

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - authentication.controller.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Importing sequelize models
const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const User = db.users;
const Authentication = db.authentications;

// Check and verifies user login
exports.login = async (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "You must supply an email and password to login.",
        });
        return;
    }

    // Set parameters for user search
    const authData = {
        email: req.body.email,
        password: req.body.password,
    };

    // Searching for the user/password combo in the 
    // database and returning result
    await User.findOne({
        include: [Authentication],
        where: {
            email: authData.email,
            "$Authentication.password$": authData.password,
        },
    })
        .then((data) => {
            // If the user was found, the user data is
            // sent
            if (data !== null) {
                res.send({
                    fName: data.fName,
                    lName: data.lName,
                    pNum: data.pNum,
                    email: data.email,
                    permId: data.Authentication.permId,
                });
            } else {
                // If no user was found a 404 message is sent
                res.status(404).send({
                    message: `There is no user with that email/password combination.`,
                });
            }
        })
        .catch((err) => {
            // If there is an error the message is sent
            res.status(500).send({
                message:
                    err.message ||
                    `There was an error locating user ${authData.email}.`,
            });
        });
};

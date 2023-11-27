// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.controller.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const User = db.users;
const Authentication = db.authentications;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    if (!req.body.email || !req.body.fName || !req.body.lName || !req.body.password) {
        res.status(400).send({
            message: "You must have both a first and last name.",
        });
        return;
    }

    let user = {
        fName: req.body.fName,
        lName: req.body.lName,
        pNum: req.body.pNum,
        email: req.body.email,
    };

    const userAuthentication = {
        password: req.body.password,
        permId: req.body.permId,
    }

    await User.findOne({ where: { email: user.email } })
        .then((user) => {
            if (user !== null) {
                res.status(400).send({
                    message: `The ${user.email} is already registered. Choose another.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while checking the user email.",
            });
        });

    if (res.headersSent) {
        return;
    }

    const newAuth = await Authentication.create(userAuthentication)
    .then(data => {
        return data;
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || 
            "An error occurred while adding user authentication."
        })
    })

    if (res.headersSent) {
        return;
    }

    user = {
        ...user,
        authId: newAuth.authId,
    }

    await User.create(user)
        .then((data) => {
            res.send({data, newAuth});
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the user.",
            });
        });
};

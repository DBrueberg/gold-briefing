// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - authentication.routes.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

module.exports = (app) => {
    const authentications = require("../controllers/authentication.controller");
    let router = require("express").Router();

    // Login a user
    router.post("/login", authentications.login);

    // Defining route
    app.use("/api/authentications", router);
};

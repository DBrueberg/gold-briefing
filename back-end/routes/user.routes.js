// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.routes.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Exporting routes to work with users CRUD
module.exports = (app) => {
    // Importing controller and router
    const users = require("../controllers/user.controller");
    let router = require("express").Router();

    // Create a new user
    router.post("/", users.create);

    // Defining route
    app.use("/api/users", router);
};

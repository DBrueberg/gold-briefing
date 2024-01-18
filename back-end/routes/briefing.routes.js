// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefing.routes.js
// January 15, 2024
// Last Edited (Initials, Date, Edits):

module.exports = (app) => {
    const briefings = require("../controllers/briefing.controller");
    let router = require("express").Router();

    // Create a briefing
    router.post("/", briefings.create);

    // Defining route
    app.use("/api/briefings", router);
};
// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefing.routes.js
// January 15, 2024
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/18/2025, Refactored code, made the routes more RESTful complient)

module.exports = (app) => {
    const briefings = require("../controllers/briefing.controller");
    let router = require("express").Router();

    // Create a briefing
    router.post("/briefing/", briefings.create);

    // Update a briefing by id
    router.put("/briefing/:id", briefings.update);
    
    // Find a briefing by id
    router.get("/briefing/:id", briefings.findBriefingByPk);

    // Find all briefings by userId
    router.get("/briefings/:id", briefings.findAllByUserId);

    // Delete a briefing
    router.delete("/briefing/:id", briefings.delete);
    
    // Defining route
    app.use("/api", router);
};
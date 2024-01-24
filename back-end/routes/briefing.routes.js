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

    // Update a briefing by id
    router.put("/:id", briefings.update);
    
    // Find a briefing by id
    router.get("/:id", briefings.findBriefingByPk);

    // Find all briefings by userId
    router.get("/allByUserId/:id", briefings.findAllByUserId);

    // Delete a briefing
    router.delete("/:id", briefings.delete);

    // Defining route
    app.use("/api/briefings", router);
};
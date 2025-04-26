// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - dbTestData.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):

const db = require("../models")
const Sequelize = require("sequelize");
const Permission = db.permissions;

// Function to load the test data into the database
loadTestDBData = async () => {
    // PERMISSION TABLE DATA REQUIRED ON FIRST DATABASE SYNC
    await Permission.bulkCreate([
        {
            permName: "admin",
        },
        {
            permName: "user",
        },
        {
            permName: "guest",
        },
    ]);
    console.log("Permissions loaded into database");
}

// Exporting the functions needed form module
module.exports = { loadTestDBData };
// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - default.data.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const Sequelize = require("sequelize");
const Permission = db.permissions;

// Creates the needed database default tables
exports.defaultPermissions = async () => {
    await Permission.create({ permName: "member" });
};

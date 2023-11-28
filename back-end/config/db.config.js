// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - db.config.js
// November 25, 2023
// Last Edited (Initials, Date, Edits):

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "goldBriefing",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - db.config.js
// November 25, 2023
// Last Edited (Initials, Date, Edits):

const checkEnv = require("../helperFunction/checkEnvironment");
// Checking for production environment
const isProd = checkEnv();

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

module.exports = {
    HOST: isProd ? process.env.MYSQL_HOST : "localhost",
    PORT: isProd ? process.env.MYSQL_PORT : 3306,
    USER: isProd ? process.env.MYSQL_USER : "root",
    PASSWORD: isProd ? process.env.MYSQL_PASSWORD : "password",
    DB: isProd ? process.env.MYSQL_DATABASE : "goldBriefing",
    ssl: {
      ca: isProd ? process.env.CA_CERT : "",
      rejectUnauthorized: true
    },
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

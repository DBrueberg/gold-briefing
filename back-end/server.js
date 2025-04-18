// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - server.js
// November 24, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 1/15/2024, Added briefings route)

// Importing express and cors modules
const express = require("express");
const cors = require("cors");
const defaultDBData = require("./data/defaultDB.data");
const testDefaultDBData = require("./data/dbTestData");
const checkEnv = require("./helperFunction/checkEnvironment");

// Initializing express instance
const app = express();

// Check if prod environment
const isProd = checkEnv();

// Setting cors options
var corsOptions = {
    origin: isProd ? process.env.MYSQL_URL : "http://localhost:5001",
};

app.use(cors(corsOptions));

// Parse application/json content-type
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

// Test database connection
const testConnection = (async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

// Production database load and sync
const prodSequelizeDBLoad = () => {
    // Standard database sync for production
    db.sequelize
        .sync()
        .then(() => {
            console.log("DB Synced");
            // Load default data into database

        })
        .then(() => {
            // Load default data into database
            defaultDBData.loadTestDBData();
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });
}

// Development database load and sync
const devSequelizeDBLoad = () => {
    // Use to drop and resync database for development
    db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log("DB Dropped and Re-Synced");
        // Load default data into database

    })
    .then(() => {
        // Load default and test data into database
        testDefaultDBData.loadTestDBData();
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
}

// Checking if production or development environment before loading database
isProd ? prodSequelizeDBLoad() : devSequelizeDBLoad();

// Routes
require("./routes/tutorial.routes")(app);
require("./routes/user.routes")(app);
require("./routes/authentication.routes")(app);
require("./routes/briefing.routes")(app);

// Setting port
const port = process.env.PORT || 5000;

// Listening for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

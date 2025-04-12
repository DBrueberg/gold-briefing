// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - server.js
// November 24, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 1/15/2024, Added briefings route)

// Importing express and cors modules
const express = require("express");
const cors = require("cors");
const defaultData = require("./data/default.data");

// Initializing express instance
const app = express();

// Setting cors options
var corsOptions = {
    origin: "http://localhost:5001",
};

app.use(cors(corsOptions));

// Parse application/json content-type
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

// Standard database sync
db.sequelize
    .sync()
    .then(() => {
        console.log("DB Synced");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Use to drop and resync database for development
db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log("Database dropped and re-synced");
    })
    .then(() => {
        defaultData.defaultPermissions();
    });

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

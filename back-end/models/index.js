// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - index.js
// November 25, 2023
// Last Edited (Initials, Date, Edits):

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

// Configuring and initializing database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ***** DELETE THIS MODEL, ROUTES, ETC. A TEST RUN ********
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

// Importing sequelize models into the database
db.users = require("./user.model.js")(sequelize, Sequelize);
db.authentications = require("./authentication.model.js")(sequelize, Sequelize);
db.permissions = require("./permission.model.js")(sequelize, Sequelize);
db.briefings = require("./briefing.model.js")(sequelize, Sequelize);
db.locations = require("./location.model.js")(sequelize, Sequelize);
db.emergencies = require("./emergency.model.js")(sequelize, Sequelize);
db.exposures = require("./exposure.model.js")(sequelize, Sequelize);
db.lifeSavings = require("./lifeSaving.model.js")(sequelize, Sequelize);
db.lineFires = require("./lineFire.model.js")(sequelize, Sequelize);
db.pinchPoints = require("./pinchPoint.model.js")(sequelize, Sequelize);
db.ascDescs = require("./ascDesc.model.js")(sequelize, Sequelize);
db.pathTravels = require("./pathTravel.model.js")(sequelize, Sequelize);

// Defining relationships between models

// Users to Briefings
db.users.hasMany(db.briefings, { foreignKey: "userId" });
db.briefings.belongsTo(db.users, { foreignKey: "userId" });

// Authentications to Users
db.authentications.hasOne(db.users, { foreignKey: "authId" });
db.users.belongsTo(db.authentications, { foreignKey: "authId" });

// Permissions to Authentications
db.permissions.hasOne(db.authentications, { foreignKey: "permId" });
db.authentications.belongsTo(db.permissions, { foreignKey: "permId" });

// Locations to Briefings
db.locations.hasOne(db.briefings, { foreignKey: "locId" });
db.briefings.belongsTo(db.locations, { foreignKey: "locId" });

// Emergencies to Briefings
db.emergencies.hasOne(db.briefings, { foreignKey: "emerId" });
db.briefings.belongsTo(db.emergencies, { foreignKey: "emerId" });

// Exposures to Briefings
db.exposures.hasOne(db.briefings, { foreignKey: "exposureId" });
db.briefings.belongsTo(db.exposures, { foreignKey: "exposureId" });

// LifeSavings to Exposures
db.lifeSavings.hasOne(db.exposures, { foreignKey: "lifeSaveId" });
db.exposures.belongsTo(db.lifeSavings, { foreignKey: "lifeSaveId" });

// LineFires to Exposures
db.lineFires.hasOne(db.exposures, { foreignKey: "lineFireId" });
db.exposures.belongsTo(db.lineFires, { foreignKey: "lineFireId" });

// PinchPoints to Exposures
db.pinchPoints.hasOne(db.exposures, { foreignKey: "pinchPointId" });
db.exposures.belongsTo(db.pinchPoints, { foreignKey: "pinchPointId" });

// AscDescs to Exposures
db.ascDescs.hasOne(db.exposures, { foreignKey: "ascDescId" });
db.exposures.belongsTo(db.ascDescs, { foreignKey: "ascDescId" });

// PathTravels to Exposures
db.pathTravels.hasOne(db.exposures, { foreignKey: "pathTravelId" });
db.exposures.belongsTo(db.pathTravels, { foreignKey: "pathTravelId" });

module.exports = db;

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - authentication.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the authentications table
module.exports = (sequelize, DataTypes) => {
    const Authentication = sequelize.define("Authentication", {
        authId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: DataTypes.STRING(50),
        },
    });

    return Authentication;
};

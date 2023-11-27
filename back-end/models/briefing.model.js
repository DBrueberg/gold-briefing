// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefing.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the briefings table
module.exports = (sequelize, DataTypes) => {
    const Briefing = sequelize.define("Briefing", {
        briefingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        briefingName: {
            type: DataTypes.STRING(50),
        },
        conductedBy: {
            type: DataTypes.STRING(80),
        },
        eIC: {
            type: DataTypes.STRING(80),
        },
        placeOfSafety: {
            type: DataTypes.STRING,
        },
        taskDetails: {
            type: DataTypes.STRING,
        },
        taskRules: {
            type: DataTypes.STRING,
        },
    });

    return Briefing;
};
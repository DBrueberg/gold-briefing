// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - emergency.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the emergencies table
module.exports = (sequelize, DataTypes) => {
    const Emergency = sequelize.define(
        "Emergency",
        {
            emerId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            hospName: {
                type: DataTypes.STRING(50),
            },
            accessPoint: {
                type: DataTypes.STRING,
            },
            evacRoute: {
                type: DataTypes.STRING,
            },
            callerName: {
                type: DataTypes.STRING(80),
            },
            cPR: {
                type: DataTypes.STRING(80),
            },
            medInfo: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    return Emergency;
};

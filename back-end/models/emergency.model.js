// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - emergency.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/21/2025, Refactored hospName to hospital and callerName to caller)
//  (DAB, 05/09/2025, updated max character lengths for nearestHospital)

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
            nearestHospital: {
                type: DataTypes.STRING,
            },
            accessPoint: {
                type: DataTypes.STRING,
            },
            evacRoute: {
                type: DataTypes.STRING,
            },
            caller: {
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
        },
    );

    return Emergency;
};

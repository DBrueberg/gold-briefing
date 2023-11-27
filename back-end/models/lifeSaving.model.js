// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - lifeSaving.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the lifeSavings table
module.exports = (sequelize, DataTypes) => {
    const LifeSaving = sequelize.define(
        "LifeSaving",
        {
            lifeSaveId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            risk: {
                type: DataTypes.STRING,
            },
            mitigation: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    return LifeSaving;
};

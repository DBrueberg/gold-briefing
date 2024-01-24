// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - exposure.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the exposures table
module.exports = (sequelize, DataTypes) => {
    const Exposure = sequelize.define(
        "Exposure",
        {
            exposureId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            timestamps: false
        },
    );

    return Exposure;
};

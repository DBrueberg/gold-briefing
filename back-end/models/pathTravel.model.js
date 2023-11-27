// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - pathTravel.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the pathTravels table
module.exports = (sequelize, DataTypes) => {
    const PathTravel = sequelize.define(
        "PathTravel",
        {
            pathTravelId: {
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

    return PathTravel;
};

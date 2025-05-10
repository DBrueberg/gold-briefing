// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - location.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 05/09/2025, Updated lat and lng lengths)

// Sequelize model for the locations table
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define(
        "Location",
        {
            locId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            physLoc: {
                type: DataTypes.STRING,
            },
            lat: {
                type: DataTypes.FLOAT(11, 8),
            },
            lng: {
                type: DataTypes.FLOAT(11, 8),
            },
        },
        {
            timestamps: false,
        },
    );

    return Location;
};

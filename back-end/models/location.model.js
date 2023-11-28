// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - location.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

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
                type: DataTypes.FLOAT(10, 6),
            },
            lng: {
                type: DataTypes.FLOAT(10, 6),
            },
        },
        {
            timestamps: false,
        }
    );

    return Location;
};

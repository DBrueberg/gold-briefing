// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - lineFire.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the lineFires table
module.exports = (sequelize, DataTypes) => {
    const LineFire = sequelize.define(
        "LineFire",
        {
            lineFireId: {
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

    return LineFire;
};

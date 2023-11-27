// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - ascDesc.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the ascDescs table
module.exports = (sequelize, DataTypes) => {
    const AscDesc = sequelize.define(
        "AscDesc",
        {
            ascDescId: {
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

    return AscDesc;
};

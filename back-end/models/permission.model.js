// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - permission.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the permissions table
module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define(
        "Permission",
        {
            permId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            permName: {
                type: DataTypes.STRING(50),
            },
        },
        {
            timestamps: false,
        }
    );

    return Permission;
};

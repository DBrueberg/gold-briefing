// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - pinchPoint.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the pinchPoints table
module.exports = (sequelize, DataTypes) => {
    const PinchPoint = sequelize.define(
        "PinchPoint",
        {
            pinchPointId: {
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

    return PinchPoint;
};

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.model.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

// Sequelize model for the users table
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fName: {
            type: DataTypes.STRING(50),
        },
        lName: {
            type: DataTypes.STRING(50),
        },
        pNum: {
            type: DataTypes.STRING(10),
        },
        email: {
            type: DataTypes.STRING(50),
        },
    });

    return User;
};

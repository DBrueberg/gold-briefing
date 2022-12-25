// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - helperFunction/checkEnvironment.js
// December 24, 2022
// Last Edited (Initials, Date, Edits):

// Environment check
// The NODE_ENV variable is set to production on the prod server
const checkEnv = () => {
    if (process.env.NODE_ENV === "production") {
        return true;
    } 
    // Else no NODE_ENV defined implies the default development environment
    else {
        return false;
    }
};

// Exporting checkEnv
module.exports = checkEnv;
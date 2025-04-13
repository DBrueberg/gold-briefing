// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - checkEnvironment.js
// April 12, 2025
// Last Edited (Initials, Date, Edits):

// Environment check
// The NODE_ENV variable is set to production on the prod server
const checkEnv = () => {
    if (process.env.NODE_ENV === "production") {
        console.log("running in production mode ");
        return true;

        // Else no NODE_ENV defined implies the default development environment
    } else {
        console.log("running in development mode: ");
        return false;
    }
};

module.exports = checkEnv;
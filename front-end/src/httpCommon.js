// Devin Brueberg
// 2022 Side Project
// Gold-Briefing - httpCommon.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/26/2025, Enhanced security of the baseURL by defining it in process.env)

import axios from "axios";

// NOTE: isProd does not work because it is a local environment in the railway.app server. Need to
// figure out the correct path/port. Using gold-briefing.railway.internal doubles the route, so need
// to figure out the correct way to write this
// Creating the axios instance with the base URL and headers
export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-type": "application/json",
    },
});

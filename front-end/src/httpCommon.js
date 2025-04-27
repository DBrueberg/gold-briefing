// Devin Brueberg
// 2022 Side Project
// Gold-Briefing - httpCommon.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):

import axios from "axios";

// NOTE: isProd does not work because it is a local environment in the railway.app server. Need to
// figure out the correct path/port. Using gold-briefing.railway.internal doubles the route, so need
// to figure out the correct way to write this
// Creating the axios instance with the base URL and headers
export default axios.create({
    // baseURL: isProd ? "gold-briefingback-end-production.up.railway.app" : "http://localhost:5000",
    // baseURL: "https://gold-briefingback-end-production.up.railway.app",
    baseURL: process.env.BACKEND_URL || "http://localhost:5000",
    headers: {
        "Content-type": "application/json",
    },
});

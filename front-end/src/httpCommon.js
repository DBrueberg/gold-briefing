// Devin Brueberg
// 2022 Side Project
// Gold-Briefing - httpCommon.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):

import axios from "axios";
import checkEnv from "./helperFunction/checkEnvironment";

// Check if we are on the prod environment
const isProd = checkEnv();

// Creating the axios instance with the base URL and headers
export default axios.create({
  baseURL: isProd ?
    "https://gold-briefing-production.up.railway.app/":
    "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});
// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - http-common.js
// January 2, 2023
// Last Edited (Initials, Date, Edits):

// Importing needed modules
import axios from "axios";

export default axios.create({
  baseURL: "http://api.weatherapi.com/v1/",
  headers: {
    "Content-type": "application/json"
  }
});
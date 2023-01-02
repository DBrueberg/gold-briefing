// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - weather.service.js
// January 2, 2023
// Last Edited (Initials, Date, Edits):

// Importing custom axios weather http
import weatherAPI from "../weatherAPI";

class WeatherDataService {
    /**
     * 
     * @param {*} location - can be a zip code or state
     * @returns - JSON array with forecast data for that area
     */
    forecast(location) {
        return weatherAPI.get(
            `forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=1&aqi=no&alerts=yes`
        );
    }
}

// Exporting data service
export default new WeatherDataService();

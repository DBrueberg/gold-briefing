// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - weather.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * The weather reducer will allow the weather{} state 
 * to be altered
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const weather = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_WEATHER:
            return {
                alerts: alerts([], action),
                currentCondition: action.currentCondition,
                rain: action.rain,
                snow: action.snow,
                temp: action.temp,
                realFeel: action.realFeel,
                wind: action.wind,
                gust: action.gust,
                weatherLocation: action.weatherLocation,
                windDirection: action.windDirection,
                uV: action.uV,
            };
        case C.UPDATE_WEATHER:
            return {
                alerts: alerts([], action),
                currentCondition: action.currentCondition,
                rain: action.rain,
                snow: action.snow,
                temp: action.temp,
                realFeel: action.realFeel,
                wind: action.wind,
                gust: action.gust,
                weatherLocation: action.weatherLocation,
                windDirection: action.windDirection,
                uV: action.uV,
            };
        case C.DELETE_WEATHER:
            return {};
        default:
            return {};
    }
};


/**
 * The alerts reducer will allow the alerts[] state 
 * to be altered 
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const alerts = (state = [], action) => {
    switch (action.type) {
        case C.ADD_WEATHER:
            return action.alerts.map((alert) => {
                return alert(alert, action);
            });
        case C.UPDATE_WEATHER:
            return action.alerts.map((alert) => {
                return alert(alert, action);
            });
        default:
            return [];
    }
};

/**
 * The alert reducer will allow the alert{} state to 
 * be altered
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const alert = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_WEATHER:
            return {
                event: state.event,
                description: state.description,
            };
        case C.UPDATE_WEATHER:
            return {
                event: state.event,
                description: state.description,
            };
        default:
            return {};
    }
};

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - weather.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add weather data to state
 *
 * @param {
 * alerts,
 * currentCondition,
 * rain,
 * snow,
 * temp,
 * realFeel,
 * wind,
 * gust,
 * weatherLocation,
 * windDirection,
 * uV,} param0
 * @returns
 */
export const addWeather = ({
    alerts,
    currentCondition,
    rain,
    snow,
    temp,
    realFeel,
    wind,
    gust,
    weatherLocation,
    windDirection,
    uV,
}) => ({
    type: C.ADD_WEATHER,
    alerts,
    currentCondition,
    rain,
    snow,
    temp,
    realFeel,
    wind,
    gust,
    weatherLocation,
    windDirection,
    uV,
});

/**
 * React Redux action will update weather data to state
 *
 * @param {
 * alerts,
 * currentCondition,
 * rain,
 * snow,
 * temp,
 * realFeel,
 * wind,
 * gust,
 * weatherLocation,
 * windDirection,
 * uV,} param0
 * @returns
 */
export const updateWeather = ({
    alerts,
    currentCondition,
    rain,
    snow,
    temp,
    realFeel,
    wind,
    gust,
    weatherLocation,
    windDirection,
    uV,
}) => ({
    type: C.UPDATE_WEATHER,
    alerts,
    currentCondition,
    rain,
    snow,
    temp,
    realFeel,
    wind,
    gust,
    weatherLocation,
    windDirection,
    uV,
});

/**
 * React Redux action will delete weather from state
 * @returns
 */
export const deleteWeather = () => ({
    type: C.DELETE_WEATHER,
});

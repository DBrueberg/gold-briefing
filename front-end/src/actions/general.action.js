// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - general.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add the general state
 * 
 * @param {
 * date,
 * time,
 * physLoc,
 * lat,
 * lng
 * } param0 
 * @returns 
 */
export const addGeneral = ({ date, time, physLoc, lat, lng}) => ({
    type: C.ADD_GENERAL,
    date: date,
    time: time,
    physLoc: physLoc,
    lat: lat,
    lng: lng,
});

/**
 * React Redux action will update the general state
 * 
 * @param {
 * date,
 * time,
 * physLoc,
 * lat,
 * lng
 * } param0 
 * @returns 
 */
export const updateGeneral = ({ date, time, physLoc, lat, lng}) => ({
    type: C.UPDATE_GENERAL,
    date: date,
    time: time,
    physLoc: physLoc,
    lat: lat,
    lng: lng,
});

/**
 * React Redux action will delete the general data
 * @returns 
 */
export const deleteGeneral = () => ({
    type: C.DELETE_GENERAL,
});
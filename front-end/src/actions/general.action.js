// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - general.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/20/2025, Added in the locId field)

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add the general state
 * 
 * @param {
 * locId,
 * date,
 * time,
 * physLoc,
 * lat,
 * lng
 * } param0 
 * @returns 
 */
export const addGeneral = ({ locId, dateTime, physLoc, lat, lng}) => ({
    type: C.ADD_GENERAL,
    locId: locId,
    dateTime: dateTime,
    physLoc: physLoc,
    lat: lat,
    lng: lng,
});

/**
 * React Redux action will update the general state
 * 
 * @param {
 * locId,
 * date,
 * time,
 * physLoc,
 * lat,
 * lng
 * } param0 
 * @returns 
 */
export const updateGeneral = ({ locId, date, time, physLoc, lat, lng }) => ({
    type: C.UPDATE_GENERAL,
    locId: locId,
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
// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - general.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/20/2025, Added in the locId field)
//  (DAB, 05/04/2025, Repaired some faulty logic to the update reducer)

import { reduxAction as C } from "../constants";

/**
 * The general reducer will allow the general{} state to
 * be altered
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const general = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_GENERAL:
            return {
                locId: action.locId,
                physLoc: action.physLoc,
                lat: action.lat,
                lng: action.lng,
            };
        case C.UPDATE_GENERAL:
            return {
                locId: action.locId,
                physLoc: action.physLoc,
                lat: action.lat,
                lng: action.lng,
            };
        case C.DELETE_GENERAL:
            return {};
        default:
            return state;
    }
};

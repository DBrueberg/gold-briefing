// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefingList.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * The briefingList reducer will all the briefingList[] state
 * to be altered
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const briefingList = (state = [], action) => {
    switch (action.type) {
        case C.ADD_BRIEFING_LIST:
            return [...state, briefing({}, action)];
        case C.UPDATE_BRIEFING_LIST:
            return state.map((currentBriefing) => {
                if (currentBriefing.briefingId === action.briefingId) {
                    return briefing(currentBriefing, action);
                } else {
                    return currentBriefing;
                }
            });
        case C.DELETE_BRIEFING_LIST:
            return state.filter(
                (briefing) => briefing.briefingId !== action.briefingId
            );
        case C.DELETE_ALL_BRIEFING_LIST:
            return [];
        default:
            return state;
    }
};

/**
 * The briefing reducer will all the briefing{} state
 * to be altered
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const briefing = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_BRIEFING_LIST:
            return {
                briefingId: action.briefingId,
                briefingName: action.briefingName,
            };
        case C.UPDATE_BRIEFING_LIST:
            return {
                ...state,
                briefingId: action.briefingId,
                briefingName: action.briefingName,
            };
        default:
            return state;
    }
};

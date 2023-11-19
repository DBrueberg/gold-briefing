// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - emergencyPlan.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * The emergencyPlan reducer will allow for the emergencyPlan{} 
 * state to be altered
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const emergencyPlan = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_EMERGENCY_PLAN:
            return {
                nearestHospital: action.nearestHospital,
                accessPoint: action.accessPoint,
                evacRoute: action.evacRoute,
                caller: action.caller,
                cPR: action.cPR,
                medInfo: action.medInfo,
            };
        case C.UPDATE_EMERGENCY_PLAN:
            return {
                nearestHospital: action.nearestHospital,
                accessPoint: action.accessPoint,
                evacRoute: action.evacRoute,
                caller: action.caller,
                cPR: action.cPR,
                medInfo: action.medInfo,
            };
        case C.DELETE_EMERGENCY_PLAN:
            return {};
        default:
            return state;
    }
};

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - jobBriefing.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * The jobBriefing reducer will allow the jobBriefing{}
 * state to be altered
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const jobBriefing = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_JOB_BRIEFING:
            return {
                eIC: action.eIC,
                conductedBy: action.conductedBy,
                placeOfSafety: action.placeOfSafety,
                taskDetails: action.taskDetails,
                taskRules: action.taskRules,
                primaryExposures: primaryExposure([], action),
                acknowledgements: acknowledgement([], action),
            };
        case C.UPDATE_JOB_BRIEFING:
            return {
                eIC: action.eIC,
                conductedBy: action.conductedBy,
                placeOfSafety: action.placeOfSafety,
                taskDetails: action.taskDetails,
                taskRules: action.taskRules,
                primaryExposures: primaryExposure([], action),
                acknowledgements: acknowledgement([], action),
            };
        case C.DELETE_JOB_BRIEFING:
            return {};
        default:
            return {};
    }
};

/**
 * The primaryExposures reducer will allow the primaryExposures[]
 * state to be altered
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const primaryExposures = (state = [], action) => {
    switch (action.type) {
        case C.ADD_JOB_BRIEFING:
            return [...state, primaryExposure({}, action)];
        case C.UPDATE_JOB_BRIEFING:
            return [...state, primaryExposure({}, action)];
        case C.DELETE_JOB_BRIEFING:
            return [];
        default:
            return [];
    }
};

/**
 * The primaryExposure reducer will allow the primaryExposure{}
 * state to be altered
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const primaryExposure = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_JOB_BRIEFING:
            return {
                name: action.name,
                riskExposure: action.riskExposure,
                protMitigation: action.protMitigation,
            };
        case C.UPDATE_JOB_BRIEFING:
            return {
                name: action.name,
                riskExposure: action.riskExposure,
                protMitigation: action.protMitigation,
            };
        case C.DELETE_JOB_BRIEFING:
            return {};
        default:
            return {};
    }
};

/**
 * The acknowledgements reducer will allow the acknowledgements[]
 * state to be altered
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const acknowledgements = (state = [], action) => {
    switch (action.type) {
        case C.ADD_JOB_BRIEFING:
            return [...state, acknowledgement({}, action)];
        case C.UPDATE_JOB_BRIEFING:
            return [...state, acknowledgement({}, action)];
        case C.DELETE_JOB_BRIEFING:
            return [];
        default:
            return [];
    }
};

/**
 * The acknowledgment reducer will allow the acknowledgment{}
 * state to be altered
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const acknowledgement = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_JOB_BRIEFING:
            return {
                employeeName: action.employeeName,
                employeePNum: action.employeePNum,
            };
        case C.UPDATE_JOB_BRIEFING:
            return {
                employeeName: action.employeeName,
                employeePNum: action.employeePNum,
            };
        case C.DELETE_JOB_BRIEFING:
            return {};
        default:
            return {};
    }
};

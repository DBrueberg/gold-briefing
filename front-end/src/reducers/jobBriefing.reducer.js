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
                primaryExposures: primaryExposures([], action),
                acknowledgements: acknowledgements([], action),
            };
        case C.ADD_ACKNOWLEDGEMENT:
            return [...state, acknowledgements(state.acknowledgements, action)];
        case C.UPDATE_JOB_BRIEFING:
            return {
                eIC: action.eIC,
                conductedBy: action.conductedBy,
                placeOfSafety: action.placeOfSafety,
                taskDetails: action.taskDetails,
                taskRules: action.taskRules,
                primaryExposures: primaryExposures([], action),
                acknowledgements: acknowledgements([], action),
            };
        case C.DELETE_JOB_BRIEFING:
            return {};
        case C.DELETE_ALL_ACKNOWLEDGEMENTS:
            return [...state, acknowledgements([], action)];
        default:
            return state;
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
            return action.primaryExposures.map((exposure) => {
                return primaryExposure(exposure, action);
            });
        case C.UPDATE_JOB_BRIEFING:
            return action.primaryExposures.map((exposure) => {
                return primaryExposure(exposure, action);
            });
        case C.DELETE_JOB_BRIEFING:
            return [];
        default:
            return state;
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
                name: state.name,
                riskExposure: state.riskExposure,
                protMitigation: state.protMitigation,
            };
        case C.UPDATE_JOB_BRIEFING:
            return {
                name: state.name,
                riskExposure: state.riskExposure,
                protMitigation: state.protMitigation,
            };
        case C.DELETE_JOB_BRIEFING:
            return {};
        default:
            return state;
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
            return action.acknowledgements.map((current) => {
                return acknowledgement(current, action);
            });
        case C.ADD_ACKNOWLEDGEMENT:
            return [...state, acknowledgement({}, action)];
        case C.UPDATE_JOB_BRIEFING:
            return action.acknowledgements.map((current) => {
                return acknowledgement(current, action);
            });
        case C.DELETE_JOB_BRIEFING:
            return [];
        case C.DELETE_ALL_ACKNOWLEDGEMENTS:
            return [];
        default:
            return state;
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
                employeeName: state.employeeName,
                employeePNum: state.employeePNum,
            };
        case C.ADD_ACKNOWLEDGEMENT:
            return {
                employeeName: action.employeeName,
                employeePNum: action.employeePNum,
            };
        case C.UPDATE_JOB_BRIEFING:
            return {
                employeeName: state.employeeName,
                employeePNum: state.employeePNum,
            };
        case C.DELETE_JOB_BRIEFING:
            return {};
        default:
            return state;
    }
};

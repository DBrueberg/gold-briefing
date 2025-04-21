// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - jobBriefing.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/24/2023, Added in the briefingName field)
//  (DAB, 04/20/2025, Added in the briefingId, and specific
//      exposure id fields, and refactored the exposures to match the database)
//  (DAB, 04/21/2025, Refactored the exposure reducer to
//      add the correct exposure id fields)

import { reduxAction as C, exposureConstants } from "../constants";

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
            console.log(action);
            console.log("action", action);
            return {
                briefingId: action.briefingId,
                briefingName: action.briefingName,
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
                briefingId: action.briefingId,
                briefingName: action.briefingName,
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
        case C.ADD_JOB_BRIEFING: {
            switch (state.name) {
                case exposureConstants.LIFE_SAVING_NAME:
                    return {
                        lifeSaveId: state.lifeSaveId,
                        name: state.name,
                        risk: state.risk,
                        mitigation: state.mitigation,
                    };
                case exposureConstants.LINE_FIRE_NAME:
                    return {
                        lineFireId: state.lineFireId,
                        name: state.name,
                        risk: state.risk,
                        mitigation: state.mitigation,
                    };
                case exposureConstants.PINCH_POINT_NAME:
                    return {
                        pinchPointId: state.pinchPointId,
                        name: state.name,
                        risk: state.risk,
                        mitigation: state.mitigation,
                    };
                case exposureConstants.ASC_DESC_NAME:
                    return {
                        ascDescId: state.ascDescId,
                        name: state.name,
                        risk: state.risk,
                        mitigation: state.mitigation,
                    };
                case exposureConstants.PATH_TRAVEL_NAME:
                    return {
                        pathTravelId: state.pathTravelId,
                        name: state.name,
                        risk: state.risk,
                        mitigation: state.mitigation,
                    };
                default:
                    return state;
            }
        }
        case C.UPDATE_JOB_BRIEFING:
            return {
                name: state.primaryExposure.name,
                risk: state.primaryExposure.risk,
                mitigation: state.primaryExposure.mitigation,
                ...state,
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
                employeeName: state.employeeName,
                employeePNum: state.employeePNum,
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

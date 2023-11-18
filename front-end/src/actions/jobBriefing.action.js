// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - jobBriefing.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add a job briefing to state
 * 
 * @param {
 * eIC, 
 * conductedBy, 
 * placeOfSafety, 
 * taskDetails, 
 * taskRules, 
 * primaryExposures, 
 * acknowledgement
 * } param0
 * @returns
 */
export const addJobBriefing = ({
    eIC,
    conductedBy,
    placeOfSafety,
    taskDetails,
    taskRules,
    primaryExposures,
    acknowledgement,
}) => ({
    type: C.ADD_JOB_BRIEFING,
    eIC: eIC,
    conductedBy,
    placeOfSafety,
    taskDetails,
    taskRules,
    primaryExposures,
    acknowledgement,
});

/**
 * React Redux action will update a job briefing to state
 * 
 * @param {
* eIC, 
* conductedBy, 
* placeOfSafety, 
* taskDetails, 
* taskRules, 
* primaryExposures, 
* acknowledgement
* } param0
* @returns
*/
export const updateJobBriefing = ({
    eIC,
    conductedBy,
    placeOfSafety,
    taskDetails,
    taskRules,
    primaryExposures,
    acknowledgement,
}) => ({
    type: C.UPDATE_JOB_BRIEFING,
    eIC,
    conductedBy,
    placeOfSafety,
    taskDetails,
    taskRules,
    primaryExposures,
    acknowledgement,
});

/**
 * React Redux action will delete a job briefing to state
 * 
 * @param {} param0
* @returns
*/
export const deleteJobBriefing = () => ({
    type: C.DELETE_JOB_BRIEFING,
});

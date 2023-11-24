// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - jobBriefing.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/24/2023, Added in the briefingName field)

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
 * acknowledgements,
 * briefingName
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
    acknowledgements,
    briefingName
}) => ({
    type: C.ADD_JOB_BRIEFING,
    eIC: eIC,
    conductedBy,
    placeOfSafety,
    taskDetails,
    taskRules,
    primaryExposures,
    acknowledgements,
    briefingName
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
 * acknowledgements
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
    acknowledgements,
}) => ({
    type: C.UPDATE_JOB_BRIEFING,
    eIC,
    conductedBy,
    placeOfSafety,
    taskDetails,
    taskRules,
    primaryExposures,
    acknowledgements,
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

/**
 * React Redux action will add an acknowledgement to the list
 * 
 * @param {employeeName, employeePNum} param0 
 * @returns 
 */
export const addAcknowledgement = ({ employeeName, employeePNum }) => ({
    type: C.ADD_ACKNOWLEDGEMENT,
    employeeName,
    employeePNum,
});

/**
 * React Redux action will clear all entries on the acknowledgment list
 * 
 * @returns 
 */
export const deleteAllAcknowledgement = () => ({
    type: C.DELETE_ALL_ACKNOWLEDGEMENT,
});

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - emergencyPlan.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add an emergency plan to state
 *
 * @param {
 * nearestHospital,
 * accessPoint,
 * evacRoute,
 * caller,
 * cPR,
 * medInfo
 * } param0
 * @returns
 */
export const addEmergencyPlan = ({
    nearestHospital,
    accessPoint,
    evacRoute,
    caller,
    cPR,
    medInfo,
}) => ({
    type: C.ADD_EMERGENCY_PLAN,
    nearestHospital: nearestHospital,
    accessPoint: accessPoint,
    evacRoute: evacRoute,
    caller: caller,
    cPR: cPR,
    medInfo: medInfo,
});

/**
 * React Redux action will update emergency plan in state
 *
 * @param {
 * nearestHospital,
 * accessPoint,
 * evacRoute,
 * caller,
 * cPR,
 * medInfo
 * } param0
 * @returns
 */
export const updateEmergencyPlan = ({
    nearestHospital,
    accessPoint,
    evacRoute,
    caller,
    cPR,
    medInfo,
}) => ({
    type: C.UPDATE_EMERGENCY_PLAN,
    nearestHospital: nearestHospital,
    accessPoint: accessPoint,
    evacRoute: evacRoute,
    caller: caller,
    cPR: cPR,
    medInfo: medInfo,
});

/**
 * React Redux action will delete emergency plan from state
 * @returns
 */
export const deleteEmergencyPlan = () => ({
    type: C.DELETE_EMERGENCY_PLAN,
});

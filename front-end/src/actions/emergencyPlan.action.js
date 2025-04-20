// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - emergencyPlan.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/24/2023, Added in the emerId field)

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add an emergency plan to state
 *
 * @param {
 * emerId,
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
    emerId,
    nearestHospital,
    accessPoint,
    evacRoute,
    caller,
    cPR,
    medInfo,
}) => ({
    type: C.ADD_EMERGENCY_PLAN,
    emerId: emerId,
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
 * emerId,
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
    emerId,
    nearestHospital,
    accessPoint,
    evacRoute,
    caller,
    cPR,
    medInfo,
}) => ({
    type: C.UPDATE_EMERGENCY_PLAN,
    emerId: emerId,
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

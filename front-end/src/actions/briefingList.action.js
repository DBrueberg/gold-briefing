// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefingList.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add a briefing item to the briefing
 * list
 *
 * @param {
 * briefingId,
 * briefingName
 * } param0
 * @returns
 */
export const addBriefingList = ({ briefingId, briefingName }) => ({
    type: C.ADD_BRIEFING_LIST,
    briefingId: briefingId,
    briefingName: briefingName,
});

/**
 * React Redux action will update a briefing item in the
 * list
 *
 * @param {
 * briefingId,
 * briefingName
 * } param0
 * @returns
 */
export const updateBriefingList = ({ briefingId, briefingName }) => ({
    type: C.UPDATE_BRIEFING_LIST,
    briefingId: briefingId,
    briefingName: briefingName,
});

/**
 * React Redux action will delete a briefing item from the
 * list
 *
 * @param {briefingId} briefingId
 * @returns
 */
export const deleteBriefingList = (briefingId) => ({
    type: C.DELETE_BRIEFING_LIST,
    briefingId: briefingId,
});

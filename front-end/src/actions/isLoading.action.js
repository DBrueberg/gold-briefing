// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - isLoading.action.js
// May 10, 2025
// Last Edited (Initials, Date, Edits):

// Importing constants
import { reduxAction as C } from "../constants";

/**
 * Sets referenced state to loading true
 * @returns
 */
export const startLoadingBriefingUpdate = () => ({
    type: C.START_LOADING_BRIEFING_UPDATE,
    briefingUpdate: true,
});

/**
 * Sets referenced state to loading true
 * @returns
 */
export const startLoadingBriefingCreate = () => ({
    type: C.START_LOADING_BRIEFING_CREATE,
    briefingCreate: true,
});

/**
 * Sets referenced state to loading true
 * @returns
 */
export const startLoadingCreateAccount = () => ({
    type: C.START_LOADING_CREATE_ACCOUNT,
    createAccount: true,
});

/**
 * Sets referenced state to loading true
 * @returns
 */
export const startLoadingDeleteBriefing = () => ({
    type: C.START_LOADING_DELETE_BRIEFING,
    deleteBriefing: true,
});

/**
 * Sets referenced state to loading true
 * @returns
 */
export const startLoadingLogginIn = () => ({
    type: C.START_LOADING_LOGGING_IN,
    loggingIn: true,
});

/**
 * Sets referenced state to loading true
 * @returns
 */
export const startLoadingLoadBriefing = () => ({
    type: C.START_LOADING_LOAD_BRIEFING,
    loadBriefing: true,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingBriefingUpdate = () => ({
    type: C.END_LOADING_BRIEFING_UPDATE,
    briefingUpdate: false,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingBriefingCreate = () => ({
    type: C.END_LOADING_BRIEFING_CREATE,
    briefingCreate: false,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingCreateAccount = () => ({
    type: C.END_LOADING_CREATE_ACCOUNT,
    createAccount: false,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingDeleteBriefing = () => ({
    type: C.END_LOADING_DELETE_BRIEFING,
    deleteBriefing: false,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingLogginIn = () => ({
    type: C.END_LOADING_LOGGING_IN,
    loggingIn: false,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingLoadBriefing = () => ({
    type: C.END_LOADING_LOAD_BRIEFING,
    loadBriefing: false,
});

/**
 * Sets referenced state to loading false
 * @returns
 */
export const endLoadingAll = () => ({
    type: C.END_LOADING_ALL,
    briefingUpdate: false,
    briefingCreate: false,
    createAccount: false,
    deleteBriefing: false,
    loggingIn: false,
    loadBriefing: false,
});

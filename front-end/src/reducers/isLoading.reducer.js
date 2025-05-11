// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - isLoading.reducer.js
// May 10, 2025
// Last Edited (Initials, Date, Edits):

// Importing constants
import { reduxAction as C } from "../constants";

/**
 * The isLoading reducer will alter the redux state
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const isLoading = (state = {}, action) => {
    switch (action.type) {
        case C.START_LOADING_BRIEFING_UPDATE:
            return { ...state, briefingUpdate: action.briefingUpdate };
        case C.START_LOADING_BRIEFING_CREATE:
            return { ...state, briefingCreate: action.briefingCreate };
        case C.START_LOADING_CREATE_ACCOUNT:
            return { ...state, createAccount: action.createAccount };
        case C.START_LOADING_DELETE_BRIEFING:
            return { ...state, deleteBriefing: action.deleteBriefing };
        case C.START_LOADING_LOGGING_IN:
            return { ...state, loggingIn: action.loggingIn };
        case C.START_LOADING_LOAD_BRIEFING:
            return { ...state, loadBriefing: action.loadBriefing };
        case C.END_LOADING_BRIEFING_UPDATE:
            return { ...state, briefingUpdate: action.briefingUpdate };
        case C.END_LOADING_BRIEFING_CREATE:
            return { ...state, briefingCreate: action.briefingCreate };
        case C.END_LOADING_CREATE_ACCOUNT:
            return { ...state, createAccount: action.createAccount };
        case C.END_LOADING_DELETE_BRIEFING:
            return { ...state, deleteBriefing: action.deleteBriefing };
        case C.END_LOADING_LOGGING_IN:
            return { ...state, loggingIn: action.loggingIn };
        case C.END_LOADING_LOAD_BRIEFING:
            return { ...state, loadBriefing: action.loadBriefing };
        case C.END_LOADING_ALL:
            return {
                ...state,
                briefingUpdate: action.briefingUpdate,
                briefingCreate: action.briefingCreate,
                createAccount: action.createAccount,
                deleteBriefing: action.deleteBriefing,
                loggingIn: action.loggingIn,
                loadBriefing: action.loadBriefing,
            };
        default:
            return state;
    }
};

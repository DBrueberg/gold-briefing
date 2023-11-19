// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.reducer.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * The user reducer will all the user[] state to 
 * be altered
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const user = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER: 
            return {
                userId: action.userId,
                fName: action.fName,
                lName: action.lName,
                pNum: action.pNum,
                email: action.email,
                permission: action.permission,
                isLoggedIn: action.isLoggedIn,
            };
        case C.UPDATE_USER:
            return {
                ...state,
                fName: action.fName,
                lName: action.lName,
                pNum: action.pNum,
                email: action.email,
            };
        case C.DELETE_USER:
            return {};
        default:
            return state;
    }
};

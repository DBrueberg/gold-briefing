// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.action.js
// November 17, 2023
// Last Edited (Initials, Date, Edits):

import { reduxAction as C } from "../constants";

/**
 * React Redux action will add a user to state with a default 
 * permission 1 and log them in
 * 
 * @param { userId, fName, lName, pNumber, email } param0 
 * @returns 
 */
export const addUser = ({ userId, fName, lName, pNumber, email }) => ({
    type: C.ADD_USER,
    id: userId,
    fName: fName,
    lName: lName,
    pNumber: pNumber,
    email: email,
    permission: 1,
    isLoggedIn: 1,
});

/**
 * React Redux action will update the user in state
 * 
 * @param { fName, lName, pNumber, email } param0 
 * @returns 
 */
export const updateUser = ({ fName, lName, pNumber, email }) => ({
    type: C.UPDATE_USER,
    fName: fName,
    lName: lName,
    pNumber: pNumber,
    email: email,
});

/**
 * React Redux action will delete a user from state
 * 
 * @param {*} userId 
 * @returns 
 */
export const deleteUser = () => ({
    type: C.DELETE_USER,
});

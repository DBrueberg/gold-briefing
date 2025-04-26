// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - authentication.thunk.action.js
// April 19, 2025
// Last Edited (Initials, Date, Edits):

// Importing the needed redux actions and user service
import { addUser } from "../user.action";
import AuthenticationService from "../../services/authentication.service";

/**
 * The loginUserThunk function will handle the actions needed to login a user and 
 * return the resulting error or non critical user data.
 * 
 * @param {Object} userData - The email and password of the user for verifcation
 * @returns {Promise} - A promise that resolves to the response status
 */
export const loginUserThunk = (userData) => {
    return async (dispatch) => {
        try {
            // Logging in the user
            const response = await AuthenticationService.login(userData);

            // If the user is logged in, dispatch the action to add the user to redux state
            if (response.status === 200) {
                // Destructuring the response to get the user data. Need the newly created
                // userId
                const { data: updatedUserData } = response;

                // Saving the new user data to the redux state
                dispatch(addUser(updatedUserData));

                // Returning the response status to the caller to 
                // indicate success
                return 200;
            }
            if (response.status === 404) {
                // If the user does not exist, return a 404 status
                return 404;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error logging in user:", error);
            // If the user already exists, return a 400 status
            if (error.response.status === 400) {
                return 400;
            }
        }
    };
}
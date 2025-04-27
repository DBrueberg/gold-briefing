// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.thunk.action.js
// April 19, 2025
// Last Edited (Initials, Date, Edits):

// Importing the needed redux actions and user service
import { addUser, updateUser, deleteUser } from "../user.action";
import UserDataService from "../../services/user.service";

/**
 * The addUserThunk function will handle the actions needed to add a user to the database
 * and redux state. It will use the UserDataService to send the data to the backend and
 * then dispatch the action to update the redux state.
 *
 * @param {Object} userData - The data for the user to be added
 * @returns {Promise} - A promise that resolves to the response status
 */
export const addUserThunk = (userData) => {
    return async (dispatch) => {
        try {
            // Creating the user in the database
            const response = await UserDataService.create(userData);

            // If the user is created, dispatch the action to add the user to redux state
            if (response.status === 200) {
                // Destructuring the response to get the user data. Need the newly created
                // userId
                const { data: updatedUserData } = response.data;

                // Saving the new user data to the redux state
                dispatch(addUser(updatedUserData));

                // Returning the response status to the caller to
                // indicate success
                return 200;
            }
        } catch (error) {
            console.log("Error message status:", error.message);
            // If there is an error, log it to the console
            console.error("Error creating user:", error);
            // If there is a network error the return is 503
            if (error.message === "Network Error") {
                return 503;
            }
            // If the user already exists, return a 400 status
            if (error.response.status === 400) {
                return 400;
            }
        }
    };
};

// Not yet implemented
export const updateUserThunk = (userData) => {
    return async (dispatch) => {
        try {
            // Updating the user in the database
            const response = await UserDataService.update(userData);

            // If the user is updated, dispatch the action to update the user in redux state
            if (response.status === 200) {
                const { data: updatedUserData } = response.data;
                console.log("User data in response:", updatedUserData);
                dispatch(updateUser(updatedUserData));
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
};

// Not yet implemented
export const deleteUserThunk = (userId) => {
    return async (dispatch) => {
        try {
            // Deleting the user in the database
            const response = await UserDataService.delete(userId);

            // If the user is deleted, dispatch the action to delete the user from redux state
            if (response.status === 200) {
                dispatch(deleteUser());
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
};

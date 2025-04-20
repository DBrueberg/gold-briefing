// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - authentication.service.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):

import http from "../httpCommon";

export class AuthenticationDataService {
    /**
     * Calling the API to login a user.
     *
     *
     * @param {JSON} - User json formatted object to be used for login.
     * @param {String} email - User email address.
     * @param {String} password - User password.
     *
     * @returns {JSON} - JSON object containing the user data.
     * @param {String} fName - User first name.
     * @param {String} lName - User last name.
     * @param {number} pNum - User 10 digit phone number unformated xxxxxxxxxx.
     * @param {String} email - User email address.
     * @param {number} permId - User permission ID.
     */
    get(data) {
        return http.post(`/api/authentication/login/`, data);
    }
}

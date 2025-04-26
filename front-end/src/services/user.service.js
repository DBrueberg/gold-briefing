// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - user.service.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):

import http from "../httpCommon";

class UserDataService {
    /**
     * Calling the API to create a new user.
     *
     * @param {Object} data - User json formatted object to be create a user, no key.
     * @param {String} fName - User first name.
     * @param {String} lName - User last name.
     * @param {number} pNum - User 10 digit phone number unformated xxxxxxxxxx.
     * @param {String} email - User email address.
     * @param {number} permId - User permission ID.
     * @param {String} password - User password.
     * }
     * @returns
     */
    create(data) {
        return http.post("/api/user/", data);
    }

    // Not in use
    get(id) {
        return http.get(`/api/user/${id}`);
    }
}

// Exporting and initializing the UserDataService class
export default new UserDataService();

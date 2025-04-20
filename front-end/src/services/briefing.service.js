// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefing.service.js
// April 18, 2025
// Last Edited (Initials, Date, Edits):

import http from "../httpCommon";

export class BriefingDataService {
    /**
     * Creates a new briefing and saves it to the database.
     *
     * @param {Object} - JSON object containing the briefing data.
     * @param {string} briefingName - The name of the briefing.
     * @param {string} eIC - The EIC of the briefing.
     * @param {string} conductedBy - The person who conducted the briefing.
     * @param {string} placeOfSafety - The place of safety for the task.
     * @param {string} taskDetails - The details of the task.
     * @param {string} taskRules - The rules that apply to the task.
     * @param {Array<object>} primaryExposures - The primary exposures associated with the task.
     * @param {string} primaryExposures[].name - The name of the primary exposure.
     * @param {string} primaryExposures[].riskExposure - The exposure risk associated with the primary exposure.
     * @param {string} primaryExposures[].protMitigation - The mitigation measures for the primary exposure.
     * @param {number} userId - The ID of the user creating the briefing.
     * @param {string} hospName - The name of the hospital to be used for the job.
     * @param {string} accessPoint - The nearest access point to the job.
     * @param {string} evacRoute - The evacuation route for the job.
     * @param {string} cPR - The person responsible for CPR.
     * @param {string} medInfo - Important medical information for persons on the job.
     * @param {string} physLoc - The physical location of the job.
     * @param {number} lat - The latitude of the job location.
     * @param {number} lng - The longitude of the job location.
     *
     * @returns @param {Object} - JSON object containing the created briefing data.
     * @param {Object} data - The created briefing data.
     * @param {number} data.briefingId - The ID of the created briefing.
     * @param {string} data.briefingName - The name of the created briefing.
     * @param {string} data.conductedBy - The person who conducted the created briefing.
     * @param {string} data.eIC - The EIC of the created briefing.
     * @param {string} data.placeOfSafety - The place of safety for the created briefing.
     * @param {string} data.taskDetails - The details of the task.
     * @param {string} data.taskRules - The rules that apply to the created briefing.
     * @param {number} data.userId - The ID of the user who created the briefing.
     * @param {number} data.locId - The ID of the location associated with the created briefing.
     * @param {number} data.emerId - The ID of the emergency table associated with the created briefing.
     * @param {number} data.exposureId - The ID of the exposure table associated with the created briefing.
     * @param {string} data.updateAt - The date and time when the briefing was last updated.
     * @param {string} data.createdAt - The date and time when the briefing was created.
     */
    create(data) {
        return http.post(`/api/briefings/`, data);
    }

    /**
     * Updates an existing briefing in the database.
     *
     * @param {Object} data - JSON object containing the briefing data with all table id fields.
     * @returns @param {Object} - JSON object containing the a message that the briefing was updated.
     */
    update(data) {
        return http.put(`/api/briefing/`, data);
    }

    /**
     * Retrieves a briefing by its ID.
     *
     * @param {number} id - The briefingId.
     *
     * @returns @param {Object} - JSON object containing the briefing data.
     */
    get(id) {
        return http.get(`/api/briefing/${id}`);
    }

    /**
     * Retrieves all briefings associated with a user ID.
     *
     * @param {number} id - The userId.
     *
     * @returns @param {Array<Object>} - Array of JSON objects containing the briefing data.
     */
    getAllByUserId(id) {
        return http.get(`/api/briefing/allByUserId/${id}`);
    }

    /**
     * Deletes a briefing by its briefingId..
     *
     * @param {number} id - The briefingId.
     * @returns @param {Object} - JSON object containing the message that the briefing was deleted.
     */
    delete(id) {
        return http.delete(`/api/briefing/${id}`);
    }
}

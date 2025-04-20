// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - jobBriefing.thunk.action.js
// April 19, 2025
// Last Edited (Initials, Date, Edits):

import { addJobBriefing } from "../jobBriefing.action";
import { addGeneral } from "../general.action";
import { addEmergencyPlan } from "../emergencyPlan.action";
import JobBriefingDataService from "../../services/jobBriefing.service";

export const addJobBriefingThunk = (jobBriefingData) => {
    return async (dispatch) => {
        try {
            // Creating the job briefing in the database
            const response = await JobBriefingDataService.create(jobBriefingData);

            console.log("Response from create job briefing: outside if", response.data);

            // If the job briefing is created, dispatch the action to add the job briefing to redux state
            if (response.status === 200) {
                const updatedJobBriefingData = response.data;

                console.log("Job Briefing Created:", updatedJobBriefingData);

                const newJobBriefingData = {
                    briefingId: updatedJobBriefingData.briefingId,
                    briefingName: updatedJobBriefingData.briefingName,
                    eIC: updatedJobBriefingData.eIC,
                    conductedBy: updatedJobBriefingData.conductedBy,
                    placeOfSafety: updatedJobBriefingData.placeOfSafety,
                    taskDetails: updatedJobBriefingData.taskDetails,
                    taskRules: updatedJobBriefingData.taskRules,
                    primaryExposures: updatedJobBriefingData.Exposure.primaryExposures,
                    acknowledgements: jobBriefingData.acknowledgements,
                }

                console.log("Primary Exposures:", newJobBriefingData.primaryExposures);

                // Saving the new job briefing data to the redux state
                dispatch(addJobBriefing(newJobBriefingData));
                dispatch(addGeneral(updatedJobBriefingData.General));
                dispatch(addEmergencyPlan(updatedJobBriefingData.Emergency));

                // Returning the response status to the caller to indicate success
                return 200;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error creating job briefing:", error);
            // If there is an error, return a 400 status
            if (error.response.status === 400) {
                return 400;
            }
        }
    };
}

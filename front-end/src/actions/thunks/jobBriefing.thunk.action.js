// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - jobBriefing.thunk.action.js
// April 19, 2025
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/26/2025, Added in delete, getAll, and getOne JobBriefingThunks)

import { addJobBriefing, deleteJobBriefing } from "../jobBriefing.action";
import { addGeneral, deleteGeneral } from "../general.action";
import { addEmergencyPlan, deleteEmergencyPlan } from "../emergencyPlan.action";
import JobBriefingDataService from "../../services/jobBriefing.service";
import {
    addAllBriefingList,
    deleteAllBriefingList,
    deleteBriefingList,
} from "../briefingList.action";
import { exposureConstants as C } from "../../constants";

/**
 * The addJobBriefingThunk function will handle the creation of a new job briefing
 * and dispatch the action to add the job briefing to the redux state after successful
 * database creation.
 *
 * @param {*} jobBriefingData
 * @returns
 */
export const addJobBriefingThunk = (jobBriefingData) => {
    return async (dispatch) => {
        try {
            // Creating the job briefing in the database
            const response = await JobBriefingDataService.create(jobBriefingData);

            // If the job briefing is created, dispatch the action to add the job
            // briefing to redux state
            if (response.status === 200) {
                const updatedJobBriefingData = response.data;

                // Debugg
                // console.log("Job Briefing Created:", updatedJobBriefingData);

                // Formatting the data to be saved into the redux state
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
                };
                const newGeneralData = {
                    locId: updatedJobBriefingData.locId,
                    physLoc: jobBriefingData.physLoc,
                    lat: jobBriefingData.lat,
                    lng: jobBriefingData.lng,
                };

                // Debugging the data to be updated in the redux state
                // console.log("Primary Exposures:", newJobBriefingData.primaryExposures);
                // console.log("Acknowledgements:", newJobBriefingData.acknowledgements);
                // console.log("General:", newGeneralData);
                // console.log("Emergency Plan:", updatedJobBriefingData);

                // Saving the new job briefing data to the redux state
                dispatch(addJobBriefing(newJobBriefingData));
                dispatch(addGeneral(newGeneralData));
                dispatch(addEmergencyPlan(updatedJobBriefingData.Emergency));

                // Returning the response status to the caller to indicate success
                return 200;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error creating job briefing:", error);
            // If there is an error, return a 400 status
            if (error.response?.status === 400) {
                return 400;
            }
            if (error?.message === "Network Error") {
                return 503;
            }
        }
    };
};

/**
 * The updateJobBriefingThunk function will handle the updating of an existing job briefing
 * and dispatch the action to update the job briefing in the redux state after successful
 * database update.
 *
 * @param {*} jobBriefingData
 * @returns
 */
export const updateJobBriefingThunk = (jobBriefingData) => {
    return async (dispatch) => {
        try {
            // Updating the job briefing in the database
            const response = await JobBriefingDataService.update(jobBriefingData);

            // If the job briefing is updated, dispatch the action to add the job
            // briefing to redux state
            if (response.status === 200) {
                // Response data is just a number, now need to format data to be updated in
                // the redux state
                let reducedPrimaryExposures = [];

                // Turning the primary exposures into an array
                // for the redux state
                for (const key in jobBriefingData.Exposure) {
                    reducedPrimaryExposures.push({
                        ...jobBriefingData.Exposure[key],
                    });
                }

                // Formating the data to be updated in the redux state
                const newJobBriefingData = {
                    briefingId: jobBriefingData.briefingId,
                    briefingName: jobBriefingData.briefingName,
                    eIC: jobBriefingData.eIC,
                    conductedBy: jobBriefingData.conductedBy,
                    placeOfSafety: jobBriefingData.placeOfSafety,
                    taskDetails: jobBriefingData.taskDetails,
                    taskRules: jobBriefingData.taskRules,
                    primaryExposures: reducedPrimaryExposures,
                    acknowledgements: jobBriefingData.acknowledgements,
                };
                const newGeneralData = {
                    locId: jobBriefingData.locId,
                    physLoc: jobBriefingData.Location.physLoc,
                    lat: jobBriefingData.Location.lat,
                    lng: jobBriefingData.Location.lng,
                };

                // Debugging the data to be updated in the redux state
                // console.log("Reduced Primary Exposures:", reducedPrimaryExposures);
                // console.log("Primary Exposures:", newJobBriefingData.primaryExposures);
                // console.log("Acknowledgements:", newJobBriefingData.acknowledgements);
                // console.log("General:", newGeneralData);
                // console.log("Emergency Plan:", jobBriefingData.Emergency);

                // Saving the new job briefing data to the redux state
                dispatch(addJobBriefing(newJobBriefingData));
                dispatch(addGeneral(newGeneralData));
                dispatch(addEmergencyPlan(jobBriefingData.Emergency));

                // Returning the response status to the caller to indicate success
                return 200;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error updating job briefing:", error);
            // If there is an error, return a 400 status
            if (error.response?.status === 400) {
                return 400;
            }
            if (error?.message === "Network Error") {
                return 503;
            }
        }
    };
};

/**
 * The deleteJobBriefingThunk will send a request to the database to delete
 * the job briefing with the paramter provided briefingId. It will then handle
 * the redux state accordingly.
 *
 * @param {number} jobBriefingId - The id of the job briefing to delete
 * @returns @param {number} response - 200 if successful 400 if not found
 */
export const deleteJobBriefingThunk = (jobBriefingId) => {
    return async (dispatch, getState) => {
        try {
            // Deleting the job briefing in the database
            const response = await JobBriefingDataService.delete(jobBriefingId);

            // If the job briefing is deleted, dispatch the action to delete the
            // job briefing from redux state
            if (response.status === 200) {
                // Need a dispatch that can both delete the briefing from the
                // briefing list redux state and the
                // database
                dispatch(deleteBriefingList(jobBriefingId));
                // Deleting the job briefing from state if it is the active one
                if (jobBriefingId === getState().jobBriefing?.briefingId) {
                    dispatch(deleteJobBriefing());
                    dispatch(deleteEmergencyPlan());
                    dispatch(deleteGeneral());
                }
                // Good delete, return 200
                return 200;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error deleting job briefing:", error);
            // If there is an error, return a 400 status
            if (error.response.status === 400) {
                return 400;
            }
        }
    };
};

/**
 * The getAllJobBriefingsThunk will request all the job briefings written by
 * a single userId. The data will then be formatted
 *
 * @param {number} userId
 * @returns @param {number} jobBriefing - data if it was found and 400 if data
 * was not found
 */
export const getAllJobBriefingsThunk = (userId) => {
    return async (dispatch) => {
        try {
            // Getting all the job briefings in the database
            const response = await JobBriefingDataService.getAllByUserId(userId);

            // If the job briefings are retrieved, dispatch the action to add the
            // job briefings to redux state
            if (response.status === 200) {
                const jobBriefings = response.data;
                dispatch(deleteAllBriefingList());
                // console.log("Job Briefings:", jobBriefings);

                // Debugging the data to be updated in the redux state
                // console.log("Job Briefings:", jobBriefings);

                // Saving the new job briefing data to the redux state
                dispatch(addAllBriefingList(jobBriefings));

                return jobBriefings;
                // Returning the response status to the caller to indicate success
                return 200;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error getting all job briefings:", error);
            // If there is an error, return a 400 status
            if (error.response.status === 400) {
                return 400;
            }
        }
    };
};

/**
 * The getOneJobBriefingThunk will request a single job briefing from the database
 * based off the job briefingId. It will retrieve and format the data.
 *
 * @param {number} briefingId
 * @returns @param {number} 200 if data was found and 400 if data was not found
 */
export const getOneJobBriefingThunk = (briefingId) => {
    return async (dispatch) => {
        try {
            // Requesting the job briefing data from the database
            const response = await JobBriefingDataService.get(briefingId);

            // If there is a briefing found, the data will be formatted and added to state
            if (response.status === 200) {
                const jobBriefingData = response.data;

                // Exposure string names are not saved to the database, adding them in
                const rawExposure = [
                    { ...jobBriefingData.Exposure.AscDesc, name: C.ASC_DESC_NAME },
                    { ...jobBriefingData.Exposure.LifeSaving, name: C.LIFE_SAVING_NAME },
                    { ...jobBriefingData.Exposure.LineFire, name: C.LINE_FIRE_NAME },
                    { ...jobBriefingData.Exposure.PathTravel, name: C.PATH_TRAVEL_NAME },
                    { ...jobBriefingData.Exposure.PinchPoint, name: C.PINCH_POINT_NAME },
                ];

                // Formating the data to be updated in the redux state
                const newJobBriefingData = {
                    briefingId: jobBriefingData.briefingId,
                    briefingName: jobBriefingData.briefingName,
                    eIC: jobBriefingData.eIC,
                    conductedBy: jobBriefingData.conductedBy,
                    placeOfSafety: jobBriefingData.placeOfSafety,
                    taskDetails: jobBriefingData.taskDetails,
                    taskRules: jobBriefingData.taskRules,
                    primaryExposures: rawExposure,
                };

                // Dispatching the redux actions to save the new data to state
                dispatch(addGeneral(response.data.Location));
                dispatch(addEmergencyPlan(response.data.Emergency));
                dispatch(addJobBriefing(newJobBriefingData));

                // Successful retrieval returns 200
                return 200;
            }
        } catch (error) {
            // If there is an error, log it to the console
            console.error("Error getting job briefing:", error);
            // If there is an error, return a 400 status
            if (error.response.status === 400) {
                // Error returns 400
                return 400;
            }
        }
    };
};

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefing.controller.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):

/**
 * Names for PrimaryExposures messed up
 * Check what the names are in the front end, prefer
 * to use the same variable names as in database
 * Verify userId is included when creating a briefing
 * should Location, emergency, and exposure data be
 * in their own arrays? Currently set up to just be
 * part of the whole. I think that might be best since
 * it all comes off the form in this format.
 */

// Importing sequelize models
const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const AscDesc = db.ascDescs;
const Briefing = db.briefings;
const LifeSaving = db.lifeSavings;
const LineFire = db.lineFires;
const Location = db.locations;
const PathTravel = db.pathTravels;
const PinchPoint = db.pinchPoints;
const Exposure = db.exposures;
const Emergency = db.emergencies;

// Create a new briefing
exports.create = async (req, res) => {
    // There must be a briefing name
    if (!req.body.briefingName || !req.body.userId) {
        res.status(400).send({
            message: "A briefing name and user id is required.",
        });
    }

    const emergencyData = {
        hospName: req.body.hospName,
        accessPoint: req.body.accessPoint,
        evacRoute: req.body.evacRoute,
        callerName: req.body.callerName,
        cPR: req.body.cPR,
        medInfo: req.body.medInfo,
    };

    console.log(req.body.primaryExposures);

    const exposuresIdPromises = await req.body.primaryExposures.map(
        async (exposure) => {
            const exposureData = {
                risk: exposure.riskExposure,
                mitigation: exposure.protMitigation,
            };

            switch (exposure.name) {
                case "Life Saving Processes":
                    // Save to lifeSaving
                    const lifeSaveId = await LifeSaving.create(exposureData)
                        .then((data) => {
                            return data.lifeSaveId;
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `An error occurred while adding ${exposure.name}`,
                            });
                        });
                    return { lifeSaveId: lifeSaveId };
                    break;
                case "Line of Fire/Release of Energy":
                    // Save to lineFire
                    const lineFireId = await LineFire.create(exposureData)
                        .then((data) => {
                            return data.lineFireId;
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `An error occurred while adding ${exposure.name}`,
                            });
                        });
                    return { lineFireId: lineFireId };
                    break;
                case "Pinch Points":
                    // Save to pinchPoints
                    const pinchPointId = await PinchPoint.create(exposureData)
                        .then((data) => {
                            return data.pinchPointId;
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `An error occurred while adding ${exposure.name}`,
                            });
                        });
                    return { pinchPointId: pinchPointId };
                    break;
                case "Ascending/Descending":
                    // Save to ascDesc
                    const ascDescId = await AscDesc.create(exposureData)
                        .then((data) => {
                            return data.ascDescId;
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `An error occurred while adding ${exposure.name}`,
                            });
                        });
                    return { ascDescId: ascDescId };
                    break;
                case "Walking/Path of Travel":
                    // Save to pathTravel
                    const pathTravelId = await PathTravel.create(exposureData)
                        .then((data) => {
                            return data.pathTravelId;
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    `An error occurred while adding ${exposure.name}`,
                            });
                        });
                    return { pathTravelId: pathTravelId };
                    break;
                default:
            }

            // If a response was sent the method will terminate
            if (res.headersSent) {
                return;
            }
        }
    )

    const exposureIdsArray = await Promise.all(exposuresIdPromises);
    console.log(exposureIdsArray)
    const exposureIds = Object.assign({}, ...exposureIdsArray);
    console.log(exposureIds)
    
    // Exposure Id's done
    const exposureId = await Exposure.create(exposureIds)
        .then((data) => {
            // The exposureId is returned
            return data.exposureId;
        })
        .catch((err) => {
            // If there is an error a response is sent
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while adding the exposure Id's.",
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    const emerId = await Emergency.create(emergencyData)
        .then((data) => {
            // Then emergencyId is returned
            return data.emergencyId;
        })
        .catch((err) => {
            // If there is an error a response is sent
            res.status(500).send({
                message:
                    err.message ||
                    "An error has occurred while creating the emergency table.",
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    const locationData = {
        physLoc: req.body.physLoc,
        lat: req.body.lat,
        lng: req.body.lng,
    };

    const locId = await Location.create(locationData)
        .then((data) => {
            // The new locId is returned
            return data.locId;
        })
        .catch((err) => {
            console.log("in location catch");
            // If there is an error a response is sent
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while adding the location data.",
            });
        });

    // If a response was sent the method is terminated
    if (res.headersSent) {
        return;
    }

    const briefing = {
        briefingName: req.body.briefingName,
        conductedBy: req.body.conductedBy,
        eIC: req.body.eIC,
        placeOfSafety: req.body.placeOfSafety,
        taskDetails: req.body.taskDetails,
        taskRules: req.body.taskRules,
        userId: req.body.userId,
        locId: locId,
        emerId: emerId,
        exposureId: exposureId,
    };

    await Briefing.create(briefing)
        .then((data) => {
            // The new briefing data is returned
            res.send({ data });
        })
        .catch((err) => {
            // If there was an error a response is sent
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the briefing",
            });
        });
};

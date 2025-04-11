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

    // Iterating through primary exposures and creating a promise array
    // of exposure ids based on the specific entry
    const exposuresIdPromises = await req.body.primaryExposures.map(
        async (exposure) => {
            // Formatting the exposure data to be used in record creation
            const exposureData = {
                risk: exposure.riskExposure,
                mitigation: exposure.protMitigation,
            };

            // The exposure will be added to its correct table by using the exposure.name
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
    );

    // Resolving promises array
    const exposureIdsArray = await Promise.all(exposuresIdPromises);

    // Converting exposure id array into a since object
    const exposureIds = Object.assign({}, ...exposureIdsArray);

    // Creating the exposer record using all the newly created exposure ids and
    // assigning the exposure id
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

    // Formatting the emergency data
    const emergencyData = {
        hospName: req.body.hospName,
        accessPoint: req.body.accessPoint,
        evacRoute: req.body.evacRoute,
        callerName: req.body.callerName,
        cPR: req.body.cPR,
        medInfo: req.body.medInfo,
    };

    // Creating an emergency record
    const emerId = await Emergency.create(emergencyData)
        .then((data) => {
            // Then emergencyId is returned
            return data.emerId;
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

    // Formatting the location data
    const locationData = {
        physLoc: req.body.physLoc,
        lat: req.body.lat,
        lng: req.body.lng,
    };

    // Adding the location data to record
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

    // Formatting the briefing data
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

    // Adding a briefing to record
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

exports.update = async (req, res) => {
    // Validate request
    if (false) {
        res.status(400).send({
            message: "You must supply an email and password to login.",
        });
        return;
    }

    await Briefing.update(briefing, {
        where: {
            userId: userId,
        },
    });
};

/**
 * Find a job briefing by briefing id. The job briefing data 
 * will be returned.
 * 
 * @param { id: briefingId - The briefing Id. } req 
 * @param { data - data from the search results. } res 
 */
exports.findBriefingByPk = async (req, res) => {
    // Getting the briefingId from the param
    const { id: briefingId } = req.params;

    // Searching the database for the a briefing with the briefing Id. Results
    // will include all child tables
    await Briefing.findByPk(briefingId, {
        attributes: {},
        include: [
            Location,
            Emergency,
            {
                model: Exposure,
                include: [
                    PinchPoint,
                    LifeSaving,
                    PathTravel,
                    LineFire,
                    AscDesc,
                ],
            },
        ],
    })
        .then((data) => {
            // If data was found it will be sent back in the res or else 
            // an error message will be sent
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Can not find Tutorial with briefingId=${briefingId}`,
                });
            }
        })
        .catch((err) => {
            // An error message is sent in res if there was an error while making the 
            // database call
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while retrieving the briefing",
            });
        });
};

/**
 * Find all briefings for a user by user id. All the briefing data will be 
 * sent in the req.
 * 
 * @param { id - The user id that will be used for the briefing query } req 
 * @param { data - All the briefing data found in the query } res 
 */
exports.findAllByUserId = async (req, res) => {
    // Getting the userId from the param
    const { id: userId } = req.params;
    let condition = userId ? { userId: userId } : null;

    await Briefing.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while retrieving briefings.",
            });
        });
};

// NEED TO CHECK THAT ALL TABLES ARE DELETED INCLUDING EXPOSURES
exports.delete = async (req, res) => {
    // Getting the briefingId in request
    const { id: briefingId } = req.params;
    let condition = { briefingId: briefingId };

    const briefingData = await Briefing.findByPk(briefingId, {
        include: [Location, Emergency, Exposure],
    })
        .then((data) => {
            if (data) {
                return data;
            } else {
                res.status(404).send({
                    message: `The briefing with id=${briefingId} was not found`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while deleting briefings.",
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    console.log("Data in delete is ", briefingData.toJSON());

    await Exposure.destroy({
        where: { exposureId: briefingData.Exposure.exposureId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Exposure with id=${briefingData.Exposure.exposureId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Exposure with id=${briefingData.Exposure.exposureId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await LifeSaving.destroy({
        where: { lifeSaveId: briefingData.Exposure.lifeSaveId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Life Saving Exposure with id=${briefingData.Exposure.lifeSaveId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Life Saving Exposure with id=${briefingData.Exposure.lifeSaveId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await LineFire.destroy({
        where: { lineFireId: briefingData.Exposure.lineFireId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Line of Fire Exposure with id=${briefingData.Exposure.lineFireId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Line of Fire Exposure with id=${briefingData.Exposure.lineFireId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await PinchPoint.destroy({
        where: { pinchPointId: briefingData.Exposure.pinchPointId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Pinch Point Exposure with id=${briefingData.Exposure.pinchPointId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Pinch Point Exposure with id=${briefingData.Exposure.pinchPointId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await AscDesc.destroy({
        where: { ascDescId: briefingData.Exposure.ascDescId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Ascending Descending Exposure with id=${briefingData.Exposure.ascDescId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Ascending Descending Exposure with id=${briefingData.Exposure.ascDescId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await PathTravel.destroy({
        where: { pathTravelId: briefingData.Exposure.pathTravelId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Path Travel Exposure with id=${briefingData.Exposure.pathTravelId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Path Travel Exposure with id=${briefingData.Exposure.pathTravelId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await Emergency.destroy({
        where: { emerId: briefingData.Emergency.emerId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Emergency with id=${briefingData.Emergency.emerId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Emergency with id=${briefingData.Emergency.emerId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await Location.destroy({
        where: { locId: briefingData.Location.locId },
    })
        .then((num) => {
            if (num == 1) {
                // Delete was successful
            } else {
                res.send({
                    message: `Cannot delete Location with id=${briefingData.Location.locId}`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Location with id=${briefingData.Location.locId} could not be deleted`,
            });
        });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    await Briefing.destroy({ where: condition })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: `Briefing was deleted successfully`,
                });
            } else {
                res.send({
                    message: `Cannot delete Briefing with id=${briefingId}. Maybe Briefing was not found`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `An error occurred and the Briefing with id=${briefingId} could not be deleted`,
            });
        });
};

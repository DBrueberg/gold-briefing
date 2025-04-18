// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - briefing.controller.js
// November 26, 2023
// Last Edited (Initials, Date, Edits):
// (DAB, 4/11/2024, Added the update method to update the briefing data)
// (DAB, 4/12/2024, Error checked new briefing controllers and added comments)

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

/**
 * Creates a new briefing record in the database.
 * 
 * @param {userId: the id of user creating this briefing. 
 * Data for the Briefing, Exposures, Emergency, and Location tables.} req 
 * @param {Returns the data from the completed database creation with ids for 
 * the briefing and the exposure tables} res 
 * @returns 
 */
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


/**
 * 
 * @param {briefingId, userId are required.
 * Updates the data from Briefing, Location, Emergency, Exposure tables if provided} req 
 * @param {200 response if briefing was updated successfully} res 
 * @returns 
 */
exports.update = async (req, res) => {
    // Validate request
    if (!req.body && !req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty, need a userId!",
        });
    }

    // Getting the table ids from the request body
    const { briefingId: briefingId } = req.body;
    const { emerId: emerId } = req.body.Emergency;
    const { locId: locId } = req.body.Location;
    const { lifeSaveId: lifeSaveId } = req.body.Exposure.LifeSaving;
    const { lineFireId: lineFireId } = req.body.Exposure.LineFire;
    const { pinchPointId: pinchPointId } = req.body.Exposure.PinchPoint;
    const { ascDescId: ascDescId } = req.body.Exposure.AscDesc;
    const { pathTravelId: pathTravelId } = req.body.Exposure.PathTravel;


    // Preparing the data to be updated in the database
    // The data is being destructured from the request body
    const briefing = req.body;
    const { Location: location } = req.body;
    const { Emergency: emergency } = req.body; 
    const { PinchPoint: pinchpoint } = req.body.Exposure;
    const { LifeSaving: lifesaving } = req.body.Exposure;
    const { PathTravel: pathtravel } = req.body.Exposure;
    const { LineFire: linefire } = req.body.Exposure;
    const { AscDesc: ascdesc } = req.body.Exposure;

    // Updating the briefing in the briefing table using briefingId to find the briefing
    await Briefing.update(briefing, {
        where: {
            briefingId: briefingId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Briefing with id=${briefingId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Updating the emergency in the emergency table using emerId to find the emergency
    await Emergency.update(emergency, {
        where: {
            emerId: emerId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Emergency with id=${emerId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Updating the location in the location table using locId to find the location
    await Location.update(location, {
        where: {
            locId: locId,
        },
    }) 
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Location with id=${locId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Updating the lifesaving in the lifesaving table using lifesavingId to find the lifesaving
    await LifeSaving.update(lifesaving, {
        where: {
            lifeSaveId: lifeSaveId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Life Saving with id=${lifeSaveId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Updating the pathtravel in the pathtravel table using pathTravelId to find the pathtravel
    await PathTravel.update(pathtravel, {
        where: {
            pathTravelId: pathTravelId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Path Travel with id=${pathTravelId}`,
        });
    });

    // If a response was sent the method will terminate 
    if (res.headersSent) {
        return;
    }

    // Updating the linefire in the linefire table using lineFireId to find the linefire
    await LineFire.update(linefire, {
        where: {
            lineFireId: lineFireId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Line Fire with id=${lineFireId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Updating the pinchpoint in the pinchpoint table using pinchPointId to find the pinchpoint
    await PinchPoint.update(pinchpoint, {
        where: {
            pinchPointId: pinchPointId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Pinch Point with id=${pinchPointId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Updating the ascdesc in the ascdesc table using ascDescId to find the ascdesc
    await AscDesc.update(ascdesc, {
        where: {
            ascDescId: ascDescId,
        },
    })
    .catch((err) => {
        res.status(500).send({
            message: `An error occurred while updating the Ascending Descending with id=${ascDescId}`,
        });
    });

    // If a response was sent the method will terminate
    if (res.headersSent) {
        return;
    }

    // Sending a response back to the client that the briefing was updated successfully
    res.status(200).send({
        message: `Briefing with id=${briefingId} was updated successfully.`,
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

    // Searching the database for all briefings with the userId, resaults are
    // returned to the caller
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

/**
 * 
 * @param {id - the briefingId to be deleted} req 
 * @param {*} res 
 * @returns 
 */
exports.delete = async (req, res) => {
    // Getting the briefingId in request
    const { id: briefingId } = req.params;
    const condition = { briefingId: briefingId };

    // Retrieving the briefing data from the database. Need the record ids to delete
    // the child records in the other tables
    const briefingData = await Briefing.findByPk(briefingId, {
        include: [Location, Emergency, Exposure],
    })
        .then((data) => {
            if (data) {
                // If the record was found the data is returned to the caller
                return data;
            } else {
                // If no record was found the response is sent with a 404
                res.status(404).send({
                    message: `The briefing with id=${briefingId} was not found`,
                });
            }
        })
        .catch((err) => {
            // An error sends a 500 response with the error message
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

    // Deleting the child records in Exposure table using the exposureId from the briefingData
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

    // Deleting the child records in the Lifesaving table using the lifeSaveId from the briefingData
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

    // Deleting the child records in the LineFire table using the lineFireId from the briefingData
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

    // Deleting the child records in the PinchPoint table using the pinchPointId from the briefingData
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

    // Deleting the child records in the AscDesc table using the ascDescId from the briefingData
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

    // Deleting the child records in the PathTravel table using the pathTravelId from the briefingData
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

    // Deleting the child records in the Emergency table using the emerId from the briefingData
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

    // Deleting the child records in the Location table using the locId from the briefingData
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

    // Deleting the briefing record using the briefingId from the request
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

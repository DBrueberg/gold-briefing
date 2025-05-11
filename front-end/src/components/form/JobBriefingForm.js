// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/28/2022, Added in the Task Component)
//  (DAB, 12/31/2022, Added in the Exposures Component)
//  (DAB, 01/01/2023, Added the Emergency and Acknowledge
//      Components)
//  (DAB, 11/09/2023, Added in BriefingSpeedDial Component)
//  (DAB, 11/12/2023, Added in SaveJobBriefing Component. Also
//      updated comments to current)
//  (DAB, 11/23/2023, Linked redux state with local state and
//      all milestone1 redux state functionality working correctly)
//  (DAB, 04/19/2025, Added in the thunk actions needed to create,
//      fetch, and update this page)
//  (DAB, 05/03/2025, Updated form to onSubmit instead of onClick)
//  (DAB, 05/04/2025, Added in form specific error handling)

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import WeatherDataService from "../../services/weather.service";
import { Backdrop, Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Task from "../subComponent/Task";
import Exposures from "../subComponent/Exposures";
import Emergency from "../subComponent/Emergency";
import Acknowledgement from "../subComponent/Acknowledgement";
import Widget from "../subComponent/Widget";
import GenerateBriefing from "../subComponent/GenerateBriefing";
import General from "../subComponent/General";
import BriefingSpeedDial from "../subComponent/BriefingSpeedDial";
import SaveJobBriefing from "../modal/SaveJobBriefing";
import { addUser } from "../../actions/user.action";
import { addWeather, deleteWeather } from "../../actions/weather.action";
import {
    addAcknowledgement,
    addJobBriefing,
    deleteJobBriefing,
} from "../../actions/jobBriefing.action";
import { addEmergencyPlan, deleteEmergencyPlan } from "../../actions/emergencyPlan.action";
import { addGeneral, deleteGeneral } from "../../actions/general.action";
import { addBriefingList } from "../../actions/briefingList.action";
import {
    addJobBriefingThunk,
    updateJobBriefingThunk,
} from "../../actions/thunks/jobBriefing.thunk.action";
import { exposureConstants } from "../../constants";
import {
    endLoadingBriefingCreate,
    endLoadingBriefingUpdate,
    startLoadingBriefingCreate,
    startLoadingBriefingUpdate,
} from "../../actions/isLoading.action";

/**
 * The JobBriefingForm View will display a completed job briefing form
 * that will generate a full job briefing
 *
 * @param {*} props
 * @returns
 */
function JobBriefingForm(props) {
    // Loading in the sample data, this is only temporary
    const { user, general, jobBriefing, weather, emergencyPlan, isLoading } = props;
    const {
        addJobBriefingThunk,
        updateJobBriefingThunk,
        addAcknowledgement,
        onAddWeather,
        onDeleteWeather,
        onDeleteGeneral,
        onDeleteEmergencyPlan,
        onDeleteJobBriefing,
        startLoadingBriefingUpdate,
        endLoadingBriefingUpdate,
        startLoadingBriefingCreate,
        endLoadingBriefingCreate,
    } = props;
    // const { user } = sampleData;
    const navigate = useNavigate();

    // Defining default settings for the local state
    const [accessPoint, setAccessPoint] = useState(
        emergencyPlan.accessPoint ? emergencyPlan.accessPoint : ""
    );
    const [acknowledgements, setAcknowledgments] = useState(
        jobBriefing.acknowledgements ? jobBriefing.acknowledgements : []
    );
    const [briefingName, setBriefingName] = useState(
        jobBriefing.briefingName ? jobBriefing.briefingName : ""
    );
    const [caller, setCaller] = useState(emergencyPlan.caller ? emergencyPlan.caller : "");
    const [conductedBy, setConductedBy] = useState(
        jobBriefing.conductedBy
            ? jobBriefing.conductedBy
            : user.fName
              ? `${user.fName} ${user.lName}`
              : ""
    );
    const [cPR, setCPR] = useState(emergencyPlan.cPR ? emergencyPlan.cPR : "");
    const [dateTime, setDateTime] = useState(
        general.dateTime ? general.dateTime : moment(new Date(), "MM-DD-YYYY HH:mm:ss")
    );
    const [eIC, setEIC] = useState(
        jobBriefing.eIC ? jobBriefing.eIC : user.fName ? `${user.fName} ${user.lName}` : ""
    );
    const [evacRoute, setEvacRoute] = useState(
        emergencyPlan.evacRoute ? emergencyPlan.evacRoute : ""
    );
    const [lat, setLat] = useState(general.lat ? general.lat : "");
    const [lng, setLng] = useState(general.lng ? general.lng : "");
    const [medInfo, setMedInfo] = useState(emergencyPlan.medInfo ? emergencyPlan.medInfo : "");
    const [nearestHospital, setNearestHospital] = useState(
        emergencyPlan.nearestHospital ? emergencyPlan.nearestHospital : ""
    );
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openBriefDialog, setOpenBriefDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [physLoc, setPhysLoc] = useState(general.physLoc ? general.physLoc : "");
    const [placeOfSafety, setPlaceOfSafety] = useState(
        jobBriefing.placeOfSafety ? jobBriefing.placeOfSafety : ""
    );
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [taskDetails, setTaskDetails] = useState(
        jobBriefing.taskDetails ? jobBriefing.taskDetails : ""
    );
    const [taskRules, setTaskRules] = useState(jobBriefing.taskRules ? jobBriefing.taskRules : "");
    const [primaryExposures, setExposures] = useState(
        jobBriefing.primaryExposures.length > 0
            ? jobBriefing.primaryExposures
            : [
                  {
                      name: exposureConstants.LIFE_SAVING_NAME,
                      lifeSaveId: "",
                      risk: "",
                      mitigation: "",
                  },
                  {
                      name: exposureConstants.LINE_FIRE_NAME,
                      lineFireId: "",
                      risk: "",
                      mitigation: "",
                  },
                  {
                      name: exposureConstants.PINCH_POINT_NAME,
                      pinchPointId: "",
                      risk: "",
                      mitigation: "",
                  },
                  {
                      name: exposureConstants.ASC_DESC_NAME,
                      ascDescId: "",
                      risk: "",
                      mitigation: "",
                  },
                  {
                      name: exposureConstants.PATH_TRAVEL_NAME,
                      pathTravelId: "",
                      risk: "",
                      mitigation: "",
                  },
              ]
    );

    // The default primary exposures that will allow for
    // resetting of the primary exposures field
    const defaultPrimaryExposures = [
        {
            name: exposureConstants.LIFE_SAVING_NAME,
            lifeSaveId: "",
            risk: "",
            mitigation: "",
        },
        {
            name: exposureConstants.LINE_FIRE_NAME,
            lineFireId: "",
            risk: "",
            mitigation: "",
        },
        {
            name: exposureConstants.PINCH_POINT_NAME,
            pinchPointId: "",
            risk: "",
            mitigation: "",
        },
        {
            name: exposureConstants.ASC_DESC_NAME,
            ascDescId: "",
            risk: "",
            mitigation: "",
        },
        {
            name: exposureConstants.PATH_TRAVEL_NAME,
            pathTravelId: "",
            risk: "",
            mitigation: "",
        },
    ];

    // The available actions for the displayed speed dial. Tied
    // to handleSpeedDialClick due to name variable
    const speedDialActions = [
        { icon: <SaveIcon />, name: "Save" },
        { icon: <UploadFileIcon />, name: "Load" },
        { icon: <RestartAltIcon />, name: "New" },
    ];

    useEffect(() => {
        // setDateTime(general.dateTime === "" ? "" : general.dateTime);
        // setConductedBy(user.fName === "" ? "" : `${user.fName} ${user.lName}`);
        // setEIC(user.fName === "" ? "" : `${user.fName} ${user.lName}`);
    }, []);

    // The clearForm method will wipe out all the data currently
    // held in the form
    const clearForm = () => {
        setConductedBy(
            jobBriefing.conductedBy
                ? jobBriefing.conductedBy
                : user.fName
                  ? `${user.fName} ${user.lName}`
                  : ""
        );
        setEIC(jobBriefing.eIC ? jobBriefing.eIC : user.fName ? `${user.fName} ${user.lName}` : "");
        setDateTime(moment(new Date(), "MM-DD-YYYY HH:mm:ss"));
        setPhysLoc("");
        setLat("");
        setLng("");
        setPlaceOfSafety("");
        setTaskDetails("");
        setTaskRules("");
        setExposures(defaultPrimaryExposures);
        setNearestHospital("");
        setCPR("");
        setAccessPoint("");
        setCaller("");
        setEvacRoute("");
        setMedInfo("");
        setAcknowledgments([]);
        setBriefingName("");
        onDeleteWeather();
        onDeleteEmergencyPlan();
        onDeleteGeneral();
        onDeleteJobBriefing();
    };

    // Function will format the weather data retrieved from the
    // weather data service
    const formatWeatherData = (data) => {
        // Initializing a temporary weather variable to hold
        // the formatted data
        let tempWeather = null;

        // If there is data it will be formatted
        if (data) {
            // Pulling the day forecast from the data
            const forecast = data.forecast.forecastday[0].day;
            // Mapping the alert data to an array
            const alertArray = data.alerts.alert.map((current) => {
                return {
                    event: current.headline,
                    description: current.desc,
                };
            });

            // Assigning and formatting the weather data
            tempWeather = {
                alerts: alertArray,
                currentCondition: data.current.condition.text,
                rain: forecast.daily_chance_of_rain,
                snow: forecast.daily_chance_of_snow,
                temp: data.current.temp_f,
                realFeel: data.current.feelslike_f,
                wind: data.current.wind_mph,
                gust: data.current.gust_mph,
                weatherLocation: data.location.name,
                windDirection: data.current.wind_dir,
                uV: data.current.uv,
            };
        }

        // Returning the data to the caller
        return tempWeather;
    };

    // The function called if the geolocation request was successful
    const geoSuccess = (position) => {
        // Setting latitude and longitude to their correct form fields
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
    };

    // The function called if the geolocation request was unsuccessful
    const geoError = () => {
        // Setting and calling the snackbar to notify the user of the
        // error
        setSnackbarMessage("Error retrieving geolocation");
        handleSnackbarClick();
    };

    // Function that will use geolocation to retrieve the users geolocation
    // data
    const location = () => {
        // If geolocation is not supported
        if (!navigator.geolocation) {
            // Setting and calling the snackbar to notify the user of the
            // error
            setSnackbarMessage("Geolocation is not supported by your browser");
            handleSnackbarClick();
        } else {
            // If geolocation is supported the request for geo data is sent and
            // the appropriate action is taken on success or failure
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        }
    };

    // The handleDebriefed method will handle the actions needed after
    // a successful job briefing debrief
    const handleDebriefed = () => {
        // Clear form and send user back to the top of the briefing
        clearForm();
        // scrolling to the top of the page after it loads
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);

        // Should send an SMS alerting everyone on the briefing that the
        // briefing was closed. Should have briefing name, EIC, time closed,
        // and phone number
    };

    // Function will open the snackbar
    const handleSnackbarClick = () => {
        // Setting the snackbar open variable to true
        setOpenSnackbar(true);
    };

    // Function will close the snackbar
    const handleSnackbarClose = (event, reason) => {
        // Setting the snackbar open variable to false and
        // nulling out the current snackbar message
        setOpenSnackbar(false);
        setSnackbarMessage(null);
    };

    // This function allows the handling of the selected
    // speed dial action
    const handleSpeedDialClick = (actName) => {
        switch (actName) {
            case "Save":
                // Calling the function that will save the briefing to the database
                saveBriefing();
                // Let user type a name before saving, name
                // must have at least one character

                // "Saved" toast pops up on screen if saved
                break;
            case "Load":
                // Take the user to the Briefings view where
                // they can choose to load or delete a briefing
                navigate("/briefings");

                break;
            case "New":
                clearForm();
                break;
            default:
                break;
        }
    };

    // The handleSubmit method will handle the actions needed after a
    // user submits the job briefing form
    const handleSubmit = (e) => {
        // Preventing default form actions
        e.preventDefault();
        if (user.userId) {
            // Saving the briefing
            saveBriefing();
        } else {
            setSnackbarMessage("You must be logged in to save briefing");
            handleSnackbarClick();
        }

        // Load the briefing into a fixed easy to read template that
        // can be sent/linked over SMS
    };

    // Function that will handle changes to the accessPoint field
    const onChangeAccessPoint = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setAccessPoint(value);
    };

    // Function that will handle changes to the caller field
    const onChangeCaller = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setCaller(value);
    };

    // Function that will handle changes to the conductedBy field
    const onChangeConductedBy = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setConductedBy(value);
    };

    // Function that will handle changes to the cPR field
    const onChangeCPR = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setCPR(value);
    };

    // Function that will handle changes to the evacRoute field
    const onChangeEvacRoute = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setEvacRoute(value);
    };

    // Function that will handle changes to the date and time fields
    const onChangeDateTime = (newDateTime) => {
        // Setting the new form field value to local state
        setDateTime(newDateTime.format("YYYY-MM-DD HH:mm:ss").toString());
    };

    // Function that will handle changes to the eIC field
    const onChangeEIC = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setEIC(value);
    };

    // Function that will handle changes to the lat field
    const onChangeLat = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;

        // Validating correct lat format. 2 digits 7 decimals max
        if (value.length <= 2) {
            setLat(value);
        }
        const [digit, decimal] = value.split(".");

        if (digit === "-" || (digit >= -90 && digit <= 90)) {
            if (decimal?.length <= 7) {
                setLat(digit + "." + decimal);
            }
        }
    };

    // Function that will handle changes to the lng field
    const onChangeLng = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;

        // Validating correct lng format. 3 digits 7 decimals max
        if (value.length <= 2) {
            setLng(value);
        }
        const [digit, decimal] = value.split(".");

        if (digit === "-" || (digit >= -180 && digit <= 180)) {
            if (decimal?.length <= 7) {
                setLng(digit + "." + decimal);
            }
        }

        // Only allowing real lng values to be inputed
        if (value === "-" || (value >= -180 && value <= 180)) {
            if (value.length > 11) {
                // Setting the new form field value to local state
                setLng(value.slice(0, 11));
            } else {
                // Setting the new form field value to local state
                setLng(value);
            }
        }
    };

    // Function that will handle changes to the medInfo field
    const onChangeMedInfo = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setMedInfo(value);
    };

    // Function that will handle changes to the nearestHospital field
    const onChangeNearestHospital = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setNearestHospital(value);
    };

    // Function that will handle changes to the physLoc field
    const onChangePhysLoc = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setPhysLoc(value);
    };

    // Function that will handle changes to the placeOfSafety field
    const onChangePlaceOfSafety = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setPlaceOfSafety(value);
    };

    // Function that will handle changes to the primaryExposures
    // field when a protMitigation is changed
    const onChangeProtMitigation = (e, exposure) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;

        // Setting the new primary protection mitigation value to
        // state
        setExposures(
            primaryExposures.map((primaryExposure) => {
                // If the exposure parameter name matches the one in state that
                // value is changed
                if (primaryExposure.name === exposure.name) {
                    return {
                        name: primaryExposure.name,
                        risk: primaryExposure.risk,
                        mitigation: value,
                    };
                }

                // If the names do not match, the original is returned
                return primaryExposure;
            })
        );
    };

    // Function that will handle changes to the primaryExposures
    // field when a riskExposure is changed
    const onChangeRiskExposure = (e, exposure) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;

        // Setting the new primary risk exposure value to
        // state
        setExposures(
            primaryExposures.map((primaryExposure) => {
                // If the exposure parameter name matches the one in state that
                // value is changed
                if (primaryExposure.name === exposure.name) {
                    return {
                        name: primaryExposure.name,
                        risk: value,
                        mitigation: primaryExposure.mitigation,
                    };
                }

                // If the names do not match, the original is returned
                return primaryExposure;
            })
        );
    };

    // Function that will handle changes to the taskDetails field
    const onChangeTaskDetails = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setTaskDetails(value);
    };

    // Function that will handle changes to the taskRules field
    const onChangeTaskRules = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setTaskRules(value);
    };

    // Function that will handle changes to the acknowledgement
    // field
    const onClickAcknowledgement = (name, phone) => {
        const acknowledgementData = {
            employeeName: name,
            employeePNum: phone,
        };
        // Setting the acknowledgement array to include the
        // new member in local state
        setAcknowledgments([...acknowledgements].concat(acknowledgementData));

        // Adding the new acknowledgment to redux state
        addAcknowledgement(acknowledgementData);
    };

    // Function will update the current weather based off location data
    // in state
    const onClickUpdateWeather = async () => {
        // lat and lng will be used first since they are the most accurate
        if ((lat !== "" && lng !== "") || physLoc) {
            try {
                // Requesting data from the weather data service
                const response = await WeatherDataService.forecast(
                    lat !== "" && lng !== "" ? `${lat},${lng}` : physLoc
                );

                // Formatting the data to match state
                const tempWeather = await formatWeatherData(response.data);

                // Dispatching to redux store
                onAddWeather(tempWeather);
            } catch (error) {
                if (error.response?.status === 400) {
                    setSnackbarMessage("No matching location found");
                    handleSnackbarClick();
                }
            }
        } else {
            // Form validation for weather location. A snackbar is used since
            // weather is not a required field
            setSnackbarMessage("Provide a location to update weather");
            handleSnackbarClick();
        }
    };

    // This function closes the SaveJobBriefing dialog
    const onCloseSaveBrief = (name) => {
        // In order to set a name and create a briefing, the user must be
        // logged in
        if (user?.userId) {
            setBriefingName(name);
        } else {
            setSnackbarMessage("You must be logged in to save a briefing");
            handleSnackbarClick();
        }

        setOpenBriefDialog(false);
        // If a name has been inputted the briefing is CREATED
        if (name) {
            // JOB BRIEFING WILL BE INITIALLY CREATED AND ADDED TO DATABASE
            onCreateBriefData(name);
        }
    };

    // Function that will handle actions for a location button click
    const onLocFindClick = () => {
        // Calling the location function to get the users geolocation
        location();
    };

    // The onCreateBriefData will create a new job briefing entry in the
    // database and add it to state
    const onCreateBriefData = async (name) => {
        if (user?.userId) {
            // Formatting the data needed to be used in the redux
            // onAdd method calls
            const jobBriefData = {
                userId: user.userId,
                briefingName: name,
                eIC: eIC,
                conductedBy: conductedBy,
                placeOfSafety: placeOfSafety,
                taskDetails: taskDetails,
                taskRules: taskRules,
                primaryExposures: primaryExposures,
                acknowledgements: acknowledgements,
            };
            const generalData = {
                dateTime: dateTime,
                physLoc: physLoc,
                lat: lat === "" ? null : parseFloat(lat),
                lng: lng === "" ? null : parseFloat(lng),
            };
            const emergencyPlanData = {
                nearestHospital: nearestHospital,
                accessPoint: accessPoint,
                caller: caller,
                cPR: cPR,
                medInfo: medInfo,
                evacRoute: evacRoute,
            };

            // Requesting from the database, isLoading set to true
            startLoadingBriefingCreate();
            // Opening spinner backdrop
            handleOpenBackdrop();

            // Adding the job briefing to the database and dispatching
            // the action for redux state
            const response = await addJobBriefingThunk({
                ...jobBriefData,
                ...generalData,
                ...emergencyPlanData,
            })
                .then((response) => {
                    // setting the isLoading state to false, database req complete
                    endLoadingBriefingCreate();
                    // Closing spinner backdrop
                    handleCloseBackdrop();
                    return response;
                })
                .catch((response) => {
                    // setting the isLoading state to false, database req complete
                    endLoadingBriefingCreate();
                    // Closing spinner backdrop
                    handleCloseBackdrop();
                    return response;
                });

            // If the briefing was saved successfully the snackbar message is set
            if (response === 200) {
                setSnackbarMessage("Briefing saved successfully");
                handleSnackbarClick();
            }
            if (response === 503) {
                setSnackbarMessage("Briefing not saved, network error");
                handleSnackbarClick();

                // Setting briefing name to an empty string. This is how
                // the app knows to create or update and it needs to
                // create the new briefing the first time
                setBriefingName("");
            }
        }
    };

    // This function will format the exposure data to match what the format the
    // database returns
    const formatExposureData = async () => {
        // Formatting the exposure data to match the database
        const structureExposure = await primaryExposures.map((exposure, index) => {
            // This switch will assign the correct id to the exposure
            switch (exposure.name) {
                case exposureConstants.LIFE_SAVING_NAME:
                    return {
                        LifeSaving: {
                            lifeSaveId: jobBriefing.primaryExposures[index].lifeSaveId,
                            name: exposure.name,
                            risk: exposure.risk,
                            mitigation: exposure.mitigation,
                        },
                    };
                case exposureConstants.LINE_FIRE_NAME:
                    return {
                        LineFire: {
                            lineFireId: jobBriefing.primaryExposures[index].lineFireId,
                            name: exposure.name,
                            risk: exposure.risk,
                            mitigation: exposure.mitigation,
                        },
                    };
                case exposureConstants.PINCH_POINT_NAME:
                    return {
                        PinchPoint: {
                            pinchPointId: jobBriefing.primaryExposures[index].pinchPointId,
                            name: exposure.name,
                            risk: exposure.risk,
                            mitigation: exposure.mitigation,
                        },
                    };
                case exposureConstants.ASC_DESC_NAME:
                    return {
                        AscDesc: {
                            ascDescId: jobBriefing.primaryExposures[index].ascDescId,
                            name: exposure.name,
                            risk: exposure.risk,
                            mitigation: exposure.mitigation,
                        },
                    };
                case exposureConstants.PATH_TRAVEL_NAME:
                    return {
                        PathTravel: {
                            pathTravelId: jobBriefing.primaryExposures[index].pathTravelId,
                            name: exposure.name,
                            risk: exposure.risk,
                            mitigation: exposure.mitigation,
                        },
                    };
                default:
                    break;
            }
        });

        // Debug for data structuring
        // console.log("Structured Exposure Data:", structureExposure);

        // Removing the index from the exposure data
        // and formatting it to match the database
        const formatExposure = Object.fromEntries(
            structureExposure.map((item) => {
                const key = Object.keys(item)[0];
                return [key, item[key]];
            })
        );

        // Debug for data structuring
        // console.log("Formatted Exposure Data:", formatExposure);

        // Returning the formatted data to the caller
        return formatExposure;
    };

    // This function is used to call the actions to add a new redux
    // state for jobBriefing, general, and emergencyPlan
    const onUpdateBriefData = async () => {
        if (user.userId) {
            // Formatting the data needed to be used in the redux
            // onAdd method calls
            const Exposure = await formatExposureData();

            const formattedUpdateData = {
                briefingId: jobBriefing.briefingId,
                briefingName: briefingName,
                conductedBy: conductedBy,
                eIC: eIC,
                placeOfSafety: placeOfSafety,
                taskDetails: taskDetails,
                taskRules: taskRules,
                userId: user.userId,
                locId: general.locId,
                emerId: emergencyPlan.emerId,
                exposureId: jobBriefing.exposureId,
                Location: {
                    locId: general.locId,
                    physLoc: physLoc,
                    lat: lat === "" ? null : parseFloat(lat),
                    lng: lng === "" ? null : parseFloat(lng),
                },
                Emergency: {
                    emerId: emergencyPlan.emerId,
                    nearestHospital: nearestHospital,
                    accessPoint: accessPoint,
                    caller: caller,
                    cPR: cPR,
                    medInfo: medInfo,
                    evacRoute: evacRoute,
                },
                Exposure: Exposure,
                acknowledgements: acknowledgements,
            };

            // Debug for formatted data
            // console.log("Formatted Update Data:", formattedUpdateData);

            // setting the isLoading state to true for database req
            startLoadingBriefingUpdate();
            // Opening spinner backdrop
            handleOpenBackdrop();

            // Calling the Thunk that will update the database with the formatted data
            const response = await updateJobBriefingThunk(formattedUpdateData)
                .then((response) => {
                    // setting the isLoading state to false, database req complete
                    endLoadingBriefingUpdate();
                    // Closing spinner backdrop
                    handleCloseBackdrop();
                    return response;
                })
                .catch((response) => {
                    // setting the isLoading state to false, database req complete
                    endLoadingBriefingUpdate();
                    // Closing spinner backdrop
                    handleCloseBackdrop();
                    return response;
                });

            // If the briefing was updated successfully the snackbar message is sent
            if (response === 200) {
                setSnackbarMessage("Briefing updated successfully");
                handleSnackbarClick();
            }
            if (response === 503) {
                setSnackbarMessage("Briefing not saved, network error");
                handleSnackbarClick();
            }
        }
    };

    // This function will open the dialog that allows the user
    // to name and save their current briefing (SaveJobBriefing.js)
    const openSaveBrief = () => {
        setOpenBriefDialog(true);
    };

    // This function will allow the user to save the current
    // briefing and name it
    const saveBriefing = () => {
        // If there is not already a database req in, the database will
        // be queried
        if (!isLoading?.briefingUpdate && !isLoading?.briefingCreate) {
            // If there is already a name the briefing is updated
            if (briefingName) {
                // The method to update an existing briefing in the database
                onUpdateBriefData(briefingName);
            }
            // Else the use is prompted to choose a name and then
            // briefing is saved
            else {
                // The method to create a new briefing in the database
                openSaveBrief();
            }
        }
    };

    const handleOpenBackdrop = () => {
        setOpenBackdrop(true);
    };
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                "& .MuiTextField-root": { m: 1 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexFlow: "row",
                    flexWrap: "wrap",
                    justifyContent: {
                        xs: "center",
                        sm: "space-around",
                        md: "end",
                    },
                }}
            >
                <Typography variant="h6" component="h2" sx={{ alignSelf: "center" }}>
                    {briefingName}
                </Typography>

                <BriefingSpeedDial
                    actions={speedDialActions}
                    handleSpeedDialClick={handleSpeedDialClick}
                />
            </Box>
            <General
                onChangeConductedBy={onChangeConductedBy}
                onChangeEIC={onChangeEIC}
                onChangeDateTime={onChangeDateTime}
                onChangePhysLoc={onChangePhysLoc}
                onChangeLat={onChangeLat}
                onChangeLng={onChangeLng}
                onChangePlaceOfSafety={onChangePlaceOfSafety}
                onLocFindClick={onLocFindClick}
                conductedBy={conductedBy}
                eIC={eIC}
                dateTime={dateTime}
                physLoc={physLoc}
                lat={lat}
                lng={lng}
                placeOfSafety={placeOfSafety}
            />
            <Widget
                weather={weather}
                onClickUpdateWeather={onClickUpdateWeather}
                lat={lat}
                lng={lng}
            />
            <Task
                onChangeTaskDetails={onChangeTaskDetails}
                onChangeTaskRules={onChangeTaskRules}
                taskDetails={taskDetails}
                taskRules={taskRules}
            />
            <Exposures
                primaryExposures={primaryExposures}
                onChangeRiskExposure={onChangeRiskExposure}
                onChangeProtMitigation={onChangeProtMitigation}
            />
            <Emergency
                onChangeNearestHospital={onChangeNearestHospital}
                onChangeCPR={onChangeCPR}
                onChangeAccessPoint={onChangeAccessPoint}
                onChangeCaller={onChangeCaller}
                onChangeEvacRoute={onChangeEvacRoute}
                onChangeMedInfo={onChangeMedInfo}
                nearestHospital={nearestHospital}
                cPR={cPR}
                accessPoint={accessPoint}
                caller={caller}
                evacRoute={evacRoute}
                medInfo={medInfo}
            />
            <Acknowledgement
                onClickAcknowledgement={onClickAcknowledgement}
                acknowledgements={acknowledgements}
            />
            <GenerateBriefing handleDebriefed={handleDebriefed} />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
            <SaveJobBriefing open={openBriefDialog} onClose={onCloseSaveBrief} />
            <Backdrop open={openBackdrop} onClick={handleCloseBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
const mapStateToProps = (state) => ({
    user: state.user,
    general: state.general,
    jobBriefing: state.jobBriefing,
    weather: state.weather,
    emergencyPlan: state.emergencyPlan,
    briefingList: state.briefingList,
    isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    addJobBriefingThunk: (jobBriefingData) => dispatch(addJobBriefingThunk(jobBriefingData)),
    updateJobBriefingThunk: (jobBriefingData) => dispatch(updateJobBriefingThunk(jobBriefingData)),
    onAddUser(userId, fName, lName, pNumber, email) {
        dispatch(addUser(userId, fName, lName, pNumber, email));
    },
    onAddGeneral(date, time, physLoc, lat, lng) {
        dispatch(addGeneral(date, time, physLoc, lat, lng));
    },
    addAcknowledgement: (acknowledgementData) => dispatch(addAcknowledgement(acknowledgementData)),
    onAddJobBriefing(
        briefingId,
        briefingName,
        eIc,
        conductedBy,
        placeOfSafety,
        taskDetails,
        taskRules,
        primaryExposures,
        acknowledgements
    ) {
        dispatch(
            addJobBriefing(
                briefingId,
                briefingName,
                eIc,
                conductedBy,
                placeOfSafety,
                taskDetails,
                taskRules,
                primaryExposures,
                acknowledgements
            )
        );
    },
    onAddEmergencyPlan(nearestHospital, accessPoint, evacRoute, caller, cPR, medInfo) {
        dispatch(addEmergencyPlan(nearestHospital, accessPoint, evacRoute, caller, cPR, medInfo));
    },
    onAddWeather(
        alerts,
        currentCondition,
        rain,
        snow,
        temp,
        realFeel,
        wind,
        gust,
        weatherLocation,
        windDirection,
        uV
    ) {
        dispatch(
            addWeather(
                alerts,
                currentCondition,
                rain,
                snow,
                temp,
                realFeel,
                wind,
                gust,
                weatherLocation,
                windDirection,
                uV
            )
        );
    },
    onAddBriefingList(briefingId, briefingName) {
        dispatch(addBriefingList(briefingId, briefingName));
    },
    onDeleteWeather() {
        dispatch(deleteWeather());
    },
    onDeleteGeneral() {
        dispatch(deleteGeneral());
    },
    onDeleteJobBriefing() {
        dispatch(deleteJobBriefing());
    },
    onDeleteEmergencyPlan() {
        dispatch(deleteEmergencyPlan());
    },
    startLoadingBriefingCreate: () => dispatch(startLoadingBriefingCreate()),
    endLoadingBriefingCreate: () => dispatch(endLoadingBriefingCreate()),
    startLoadingBriefingUpdate: () => dispatch(startLoadingBriefingUpdate()),
    endLoadingBriefingUpdate: () => dispatch(endLoadingBriefingUpdate()),
});

// Exporting the component
export default connect(mapStateToProps, mapDispatchToProps)(JobBriefingForm);

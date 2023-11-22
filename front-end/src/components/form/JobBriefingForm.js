// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/28/2022, Added in the Task Component)
//  (DAB, 12/31/2022, Added in the Exposures Component)
//  (DAB, 01/01/2023, Added the Emergency and Acknowledge
//  Components)
//  (DAB, 11/09/2023, Added in BriefingSpeedDial Component)
//  (DAB, 11/12/2023, Added in SaveJobBriefing Component. Also
//  updated comments to current)

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import General from "../subComponent/General";
import { Box, Snackbar, Typography } from "@mui/material";
import WeatherDataService from "../../services/weather.service";
import moment from "moment";
import sampleData from "../../redux/sampleData.json";
import Task from "../subComponent/Task";
import Exposures from "../subComponent/Exposures";
import Emergency from "../subComponent/Emergency";
import Acknowledgement from "../subComponent/Acknowledgement";
import Widget from "../subComponent/Widget";
import GenerateBriefing from "../subComponent/GenerateBriefing";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import BriefingSpeedDial from "../subComponent/BriefingSpeedDial";
import SaveJobBriefing from "../modal/SaveJobBriefing";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../actions/user.action";
import { addWeather, deleteWeather } from "../../actions/weather.action";
import { addJobBriefing, deleteJobBriefing } from "../../actions/jobBriefing.action";
import { addEmergencyPlan, deleteEmergencyPlan } from "../../actions/emergencyPlan.action";
import { addGeneral, deleteGeneral } from "../../actions/general.action";
import { addBriefingList } from "../../actions/briefingList.action";

/**
 * The JobBriefingForm View will display a completed job briefing form
 * that will generate a full job briefing
 *
 * @param {*} props
 * @returns
 */
function JobBriefingForm(props) {
    //***********USER AND WEATHER LOCAL STATE HAS BEEN DISABLED TEMP TO ALLOW FOR REDUX IMPLEMENTATION */
    // Loading in the sample data, this is only temporary
    const { user, general, jobBriefing, weather, emergencyPlan, briefingList } =
        props;
    const {
        onAddUser,
        onAddEmergencyPlan,
        onAddGeneral,
        onAddJobBriefing,
        onAddWeather,
        onDeleteWeather,
        onDeleteGeneral,
        onDeleteEmergencyPlan,
        onDeleteJobBriefing,
        onAddBriefingList,
    } = props;
    // const { user } = sampleData;
    const navigate = useNavigate();

    // Defining default settings for the local state
    const [accessPoint, setAccessPoint] = useState(
        emergencyPlan.accessPoint ? emergencyPlan.accessPoint : ""
    );
    const [acknowledgement, setAcknowledgment] = useState([]);
    const [briefingName, setBriefingName] = useState(
        jobBriefing.briefingName ? jobBriefing.briefingName : ""
    );
    const [caller, setCaller] = useState(
        emergencyPlan.caller ? emergencyPlan.caller : ""
    );
    const [conductedBy, setConductedBy] = useState(
        jobBriefing.conductedBy
            ? jobBriefing.conductedBy
            : `${user.fName} ${user.lName}` || ""
    );
    const [cPR, setCPR] = useState(emergencyPlan.cPR ? emergencyPlan.cPR : "");
    const [dateTime, setDateTime] = useState(moment());
    const [eIC, setEIC] = useState(
        jobBriefing.eIC ? jobBriefing.eIC : `${user.fName} ${user.lName}` || ""
    );
    const [evacRoute, setEvacRoute] = useState(
        emergencyPlan.evacRoute ? emergencyPlan.evacRoute : ""
    );
    const [lat, setLat] = useState(general.lat ? general.lat : "");
    const [lng, setLng] = useState(general.lng ? general.lng : "");
    const [medInfo, setMedInfo] = useState(
        emergencyPlan.medInfo ? emergencyPlan.medInfo : ""
    );
    const [nearestHospital, setNearestHospital] = useState(
        emergencyPlan.nearestHospital ? emergencyPlan.nearestHospital : ""
    );
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
    const [taskRules, setTaskRules] = useState(
        jobBriefing.taskRules ? jobBriefing.taskRules : ""
    );
    const [primaryExposures, setExposures] = useState(
        jobBriefing.primaryExposures
            ? jobBriefing.primaryExposures
            : [
                  {
                      name: "Life Saving Processes",
                      riskExposure: "",
                      protMitigation: "",
                  },
                  {
                      name: "Line of Fire/Release of Energy",
                      riskExposure: "",
                      protMitigation: "",
                  },
                  {
                      name: "Pinch Points",
                      riskExposure: "",
                      protMitigation: "",
                  },
                  {
                      name: "Ascending/Descending",
                      riskExposure: "",
                      protMitigation: "",
                  },
                  {
                      name: "Walking/Path of Travel",
                      riskExposure: "",
                      protMitigation: "",
                  },
              ]
    );

    // The default primary exposures that will allow for
    // resetting of the primary exposures field
    const defaultPrimaryExposures = [
        {
            name: "Life Saving Processes",
            riskExposure: "",
            protMitigation: "",
        },
        {
            name: "Line of Fire/Release of Energy",
            riskExposure: "",
            protMitigation: "",
        },
        {
            name: "Pinch Points",
            riskExposure: "",
            protMitigation: "",
        },
        {
            name: "Ascending/Descending",
            riskExposure: "",
            protMitigation: "",
        },
        {
            name: "Walking/Path of Travel",
            riskExposure: "",
            protMitigation: "",
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
        // setEIC(jobBriefing?.eIC || "")
        // sampleData.briefingList.map(briefing => onAddBriefingList(briefing))
        // onAddEmergencyPlan(sampleData.emergencyPlan);
        // onAddGeneral(sampleData.general);
        // onAddJobBriefing(sampleData.jobBriefing);
        // onAddWeather(sampleData.weather);
        // onAddUser(sampleData.user);
    }, []);

    // The clearForm method will wipe out all the data currently
    // held in the form
    const clearForm = () => {
        setConductedBy("");
        setEIC("");
        setDateTime(moment());
        setPhysLoc("");
        setLat("");
        setLng("");
        setPlaceOfSafety("");
        // setWeather({});
        setTaskDetails("");
        setTaskRules("");
        setExposures(defaultPrimaryExposures);
        setNearestHospital("");
        setCPR("");
        setAccessPoint("");
        setCaller("");
        setEvacRoute("");
        setMedInfo("");
        setAcknowledgment([]);
        setBriefingName("");
        console.log("Job Briefing Form cleared");
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
                saveBriefing();
                // Let user type a name before saving, name
                // must have at least one character

                // "Saved" toast pops up on screen if saved
                break;
            case "Load":
                console.log("Load was selected");
                // Take the user to the Briefings view where
                // they can choose to load or delete a briefing
                navigate("/briefings");

                break;
            case "New":
                console.log("New was selected");
                clearForm();
                break;
            default:
                break;
        }
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
        setDateTime(newDateTime);
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
        // Setting the new form field value to local state
        setLat(value);
    };

    // Function that will handle changes to the lng field
    const onChangeLng = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setLng(value);
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
                        riskExposure: primaryExposure.riskExposure,
                        protMitigation: value,
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
                        riskExposure: value,
                        protMitigation: primaryExposure.protMitigation,
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
        // Setting the acknowledgement array to include the
        // new member
        setAcknowledgment(
            [...acknowledgement].concat({
                name: name,
                phone: phone,
            })
        );
    };

    // Function will update the current weather based off location data
    // in state
    const onClickUpdateWeather = async () => {
        // Requesting data from the weather data service
        const response = await WeatherDataService.forecast(
            physLoc || `${lat},${lng}`
        );

        // Formatting the data to match state
        const tempWeather = await formatWeatherData(response.data);

        // Setting the weather data to local state
        // setWeather(tempWeather);

        // Dispatching to redux store
        onAddWeather(tempWeather);
    };

    // This function closes the SaveJobBriefing dialog
    const onCloseSaveBrief = (name) => {
        setBriefingName(name);
        setOpenBriefDialog(false);
    };

    // Function that will handle actions for a location button click
    const onLocFindClick = () => {
        // Calling the location function to get the users geolocation
        location();
    };

    // This function will open the dialog that allows the user
    // to name and save their current briefing (SaveJobBriefing.js)
    const openSaveBrief = () => {
        setOpenBriefDialog(true);
    };

    // This function will allow the user to save the current
    // briefing and name it
    const saveBriefing = () => {
        // If there is already a name the briefing is updated
        if (briefingName) {
        }
        // Else the use is prompted to choose a name and then
        // briefing is saved
        else {
            openSaveBrief();
        }
        // testReducers();
    };

    //************** STATE TEST METHOD ********************/
    //***************ADDED IN saveBriefing() **************/
    const testReducers = () => {
        onAddEmergencyPlan(sampleData.emergencyPlan);
        onAddGeneral(sampleData.general);
        onAddJobBriefing(sampleData.jobBriefing);
        onAddUser(sampleData.user);
        onAddWeather(sampleData.weather);
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1 },
            }}
        >
            {console.log("user object ", user)}
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
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ alignSelf: "center" }}
                >
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
                acknowledgement={acknowledgement}
            />
            <GenerateBriefing />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
            <SaveJobBriefing
                open={openBriefDialog}
                onClose={onCloseSaveBrief}
            />
        </Box>
    );
}
const mapStateToProps = (state) => ({
    user: { ...state.user },
    general: { ...state.general },
    jobBriefing: { ...state.jobBriefing },
    weather: { ...state.weather },
    emergencyPlan: { ...state.emergencyPlan },
    briefingList: [...state.briefingList],
});

const mapDispatchToProps = (dispatch) => ({
    onAddUser(userId, fName, lName, pNumber, email) {
        dispatch(addUser(userId, fName, lName, pNumber, email));
    },
    onAddGeneral(date, time, physLoc, lat, lng) {
        dispatch(addGeneral(date, time, physLoc, lat, lng));
    },
    onAddJobBriefing(
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
    onAddEmergencyPlan(
        nearestHospital,
        accessPoint,
        evacRoute,
        caller,
        cPR,
        medInfo
    ) {
        dispatch(
            addEmergencyPlan(
                nearestHospital,
                accessPoint,
                evacRoute,
                caller,
                cPR,
                medInfo
            )
        );
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
    }
});

// Exporting the component
export default connect(mapStateToProps, mapDispatchToProps)(JobBriefingForm);

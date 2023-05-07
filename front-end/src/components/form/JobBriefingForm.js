// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/28/2022, Added in the Task Component)
//  (DAB, 12/31/2022, Added in the Exposures Component)
//  (DAB, 01/01/2023, Added the Emergency and Acknowledge
//  Components)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import General from "../subComponent/General";
import { Box, Snackbar } from "@mui/material";
import WeatherDataService from "../../services/weather.service";
import moment from "moment";
import sampleData from "../../redux/sampleData.json";
import Task from "../subComponent/Task";
import Exposures from "../subComponent/Exposures";
import Emergency from "../subComponent/Emergency";
import Acknowledgement from "../subComponent/Acknowledgement";
import Widget from "../subComponent/Widget";

/**
 * The JobBriefingForm View will display a completed job briefing form
 * that will generate a full job briefing
 *
 * @param {*} props
 * @returns
 */
function JobBriefingForm(props) {
    // Loading in the sample data, this is only temporary
    const { user } = sampleData;

    // Defining default settings for the local state
    const [accessPoint, setAccessPoint] = useState("");
    const [acknowledgement, setAcknowledgment] = useState([]);
    const [caller, setCaller] = useState("");
    const [conductedBy, setConductedBy] = useState(
        `${user.firstName} ${user.lastName}` || ""
    );
    const [cPR, setCPR] = useState("");
    const [dateTime, setDateTime] = useState(moment());
    const [eIC, setEIC] = useState(`${user.firstName} ${user.lastName}` || "");
    const [evacRoute, setEvacRoute] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [medInfo, setMedInfo] = useState("");
    const [nearestHospital, setNearestHospital] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [physLoc, setPhysLoc] = useState("");
    const [placeOfSafety, setPlaceOfSafety] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [taskDetails, setTaskDetails] = useState("");
    const [taskRules, setTaskRules] = useState("");
    const [primaryExposures, setExposures] = useState([
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
    ]);
    const [weather, setWeather] = useState({
        alerts: [
            { event: "rainy", description: "its gonna rain" },
            { event: "hot", description: "It's gonna be hot" },
        ],
        currentCondition: "Snowing",
        rain: "0",
        snow: "0",
        temp: "0",
        realFeel: "-10",
        wind: "10",
        gust: "15",
        weatherLocation: "Minneapolis",
        windDirection: "NWE",
        uV: "1",
    });

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
        const response = await WeatherDataService.forecast(physLoc || `${lat}/${lng}`);

        // Formatting the data to match state
        const tempWeather = await formatWeatherData(response.data);

        // Setting the weather data to state
        setWeather(tempWeather);
    };

    // Function that will handle actions for a location button click
    const onLocFindClick = () => {
        // Calling the location function to get the users geolocation
        location();
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1 },
            }}
        >
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
            />
        </Box>
    );
}

// Exporting the component
export default JobBriefingForm;

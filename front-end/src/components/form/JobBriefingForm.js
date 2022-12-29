// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/28/2022, Added in the Task Component)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import General from "../subComponent/General";
import { Box, Snackbar } from "@mui/material";
import moment from "moment";
import sampleData from "../../redux/sampleData.json";
import Task from "../subComponent/Task";

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
    const [conductedBy, setConductedBy] = useState(
        `${user.firstName} ${user.lastName}` || ""
    );
    const [dateTime, setDateTime] = useState(moment());
    const [eIC, setEIC] = useState(`${user.firstName} ${user.lastName}` || "");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [physLoc, setPhysLoc] = useState("");
    const [placeOfSafety, setPlaceOfSafety] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [taskDetails, setTaskDetails] = useState("");
    const [taskRules, setTaskRules] = useState("");

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

    // Function that will handle changes to the conductedBy field
    const onChangeConductedBy = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setConductedBy(value);
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

    // Function that will handle changes to the taskDetails field
    const onChangeTaskDetails = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setTaskDetails(value);
    }

    // Function that will handle changes to the taskRules field
    const onChangeTaskRules = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setTaskRules(value);
    }

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
            <Task
                onChangeTaskDetails={onChangeTaskDetails}
                onChangeTaskRules={onChangeTaskRules}
                taskDetails={taskDetails}
                taskRules={taskRules}
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

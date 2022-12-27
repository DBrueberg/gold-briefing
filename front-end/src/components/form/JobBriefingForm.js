// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import General from "../subComponent/General";
import { Box, Snackbar } from "@mui/material";
import moment from "moment";
import sampleData from "../../redux/sampleData.json";

/**
 * The JobBriefingForm View will display a completed job briefing form
 * that will generate a full job briefing
 *
 * @param {*} props
 * @returns
 */
function JobBriefingForm(props) {
    const { user } = sampleData;
    const [conductedBy, setConductedBy] = useState(
        `${user.firstName} ${user.lastName}` || ""
    );
    const [eIC, setEIC] = useState(`${user.firstName} ${user.lastName}` || "");
    const [dateTime, setDateTime] = useState(moment());
    const [physLoc, setPhysLoc] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [placeOfSafety, setPlaceOfSafety] = useState("");



    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const geoSuccess = (position) => {
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
    }

    const geoError = () => {
        setSnackbarMessage("Error retrieving geolocation");
        handleSnackbarClick();
    }
    const location = async() => {
        if (!navigator.geolocation) {
            setSnackbarMessage("Geolocation is not supported by your browser");
            handleSnackbarClick();
        }
        else {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        }
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSnackbarClick = () => {
        setOpenSnackbar(true);
    }

    const handleSnackbarClose = (event, reason) => {
        setOpenSnackbar(false);
        setSnackbarMessage(null);
    }

    const onChangeConductedBy = (e) => {
        const { value } = e.target;
        setConductedBy(value);
        console.log(`Conducted by is now ${conductedBy}`);
    };
    const onChangeEIC = (e) => {
        const { value } = e.target;
        setEIC(value);
        console.log(`EIC is now ${eIC}`);
    };
    const onChangeDateTime = (newDateTime) => {
        setDateTime(newDateTime);
    };
    const onChangePhysLoc = (e) => {
        const { value } = e.target;
        setPhysLoc(value);
    };
    const onChangeLat = (e) => {
        const { value } = e.target;
        setLat(value);
    };
    const onChangeLng = (e) => {
        const { value } = e.target;
        setLng(value);
    };
    const onChangePlaceOfSafety = (e) => {
        const { value } = e.target;
        setPlaceOfSafety(value);
    };

    const onLocFindClick = () => {
        console.log("Location Button Clicked");
        location();
        console.log(snackbarMessage);
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
            <Snackbar open={openSnackbar} autoHideDuration={6000} message={snackbarMessage} onClose={handleSnackbarClose}/>
        </Box>
    );
}

// Exporting the component
export default JobBriefingForm;

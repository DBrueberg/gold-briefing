// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - General.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import sampleData from "../../redux/sampleData.json";

/** DOWNLOAD AND CHANGE THE CURRENT
 * DATE INPUT TO DATE PICKER
 * https://mui.com/x/react-date-pickers/getting-started/
 */

/**
 * The General View will display the who, when, and where the actual job will
 * take place
 *
 * @param {*} props
 * @returns
 */
function General(props) {
    const { user } = sampleData;
    const [time, setTime] = useState(moment()); 
    const userFullName = `${user.firstName} ${user.lastName}` || "";
    // **** GPS EXPERIMENTS
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const currentDate = new Date();
    const currentDay =
        currentDate.getFullYear() +
        "-" +
        currentDate.getMonth() +
        "-" +
        currentDate.getDate();
    const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
    const location = navigator.geolocation.getCurrentPosition((position) => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not enabled");
        } else {
            setStatus(null);
            setLng(position.coords.longitude);
            setLat(position.coords.setLat);
        }
    });

    const handleChange = (newTime) => {
        setTime(newTime);
    };

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: "10rem" }}
                        size="small"
                        id="conductedBy"
                        label="Conducted By"
                        defaultValue={userFullName}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        sx={{ display: "flex", flex: "1", minWidth: "10rem" }}
                        size="small"
                        id="eic"
                        label="EIC"
                        defaultValue={userFullName}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} >
                    <TimePicker
                        id="time"
                        label="Time"
                        value={time}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                sx={{ display: "flex", flex: "1" }}
                                size="small"
                                {...params}
                            />
                        )}
                        ampm={false}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2} >
                    <DesktopDatePicker
                        id="date"
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={time}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                sx={{ display: "flex", flex: "1" }}
                                size="small"
                                {...params}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {lat && console.log(`GPS latitude:${lat}, longitude:${lng}`)}
            {console.log(time)}
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex", flex: "1", minWidth: "10rem" }}
                        size="small"
                        id="location"
                        label="Physical Loc"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flex: "1" }}>
                        <LocationOnIcon sx={{ alignSelf: "center" }} />
                        <TextField
                            sx={{ flex: "1", minWidth: "5rem" }}
                            size="small"
                            id="lat"
                            label="Lat"
                        />
                        <TextField
                            sx={{ flex: "1", minWidth: "5rem" }}
                            size="small"
                            id="lng"
                            label="Long"
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        sx={{ display: "flex", flex: "1", minWidth: "10rem" }}
                        size="small"
                        id="placeOfSafety"
                        label="Place of Safety"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

// Exporting the component
export default General;

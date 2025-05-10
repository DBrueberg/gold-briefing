// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - General.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 05/04/2025, Fixed input range for lat/lng to accept
//      only valid numbers)
//  (DAB, 05/09/2025, maxLength added to match database restraints)

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import LocationOnIcon from "@mui/icons-material/LocationOn";

/**
 * The General View will display the who, when, and where the actual job will
 * take place
 *
 * @param {*} props
 * @returns
 */
function General(props) {
    // Destructuring the needed methods from props
    const {
        onChangeConductedBy,
        onChangeEIC,
        onChangeDateTime,
        onChangePhysLoc,
        onChangeLat,
        onChangeLng,
        onChangePlaceOfSafety,
        onLocFindClick,
    } = props;
    // Destructuring the needed variable from props
    const { conductedBy, eIC, dateTime, physLoc, lat, lng, placeOfSafety } = props;

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="conductedBy"
                        type="text"
                        inputProps={{ maxLength: 80 }}
                        label="Conducted By"
                        value={conductedBy}
                        onChange={onChangeConductedBy}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="eic"
                        type="text"
                        inputProps={{ maxLength: 80 }}
                        label="EIC"
                        value={eIC}
                        onChange={onChangeEIC}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={1.7} lg={2}>
                    <TimePicker
                        id="time"
                        label="Time"
                        value={dateTime}
                        onChange={(newDateTime) => onChangeDateTime(newDateTime)}
                        renderInput={(params) => (
                            <TextField sx={{ display: "flex" }} size="small" {...params} />
                        )}
                        ampm={false}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2.3} lg={2}>
                    <DesktopDatePicker
                        id="date"
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={dateTime}
                        onChange={(newDateTime) => onChangeDateTime(newDateTime)}
                        renderInput={(params) => (
                            <TextField sx={{ display: "flex" }} size="small" {...params} />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="location"
                        label="Physical Loc"
                        value={physLoc}
                        onChange={onChangePhysLoc}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item xs={12} sm={1} sx={{ m: "auto" }}>
                            <IconButton
                                sx={{}}
                                color="primary"
                                size="small"
                                onClick={onLocFindClick}
                            >
                                <LocationOnIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={5.5}>
                            <TextField
                                sx={{
                                    display: "flex",
                                    flexGrow: "1",
                                    minWidth: "5rem",
                                }}
                                size="small"
                                id="lat"
                                InputProps={{
                                    inputProps: {
                                        type: "number",
                                        step: "any",
                                        min: -90,
                                        max: 90,
                                        maxLength: 11,
                                    },
                                }}
                                label="Lat"
                                value={lat}
                                onChange={onChangeLat}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5.5}>
                            <TextField
                                sx={{
                                    display: "flex",
                                    flexGrow: "1",
                                    minWidth: "5rem",
                                }}
                                size="small"
                                id="lng"
                                InputProps={{
                                    inputProps: {
                                        type: "number",
                                        step: "any",
                                        min: -180,
                                        max: 180,
                                        maxLength: 11,
                                    },
                                }}
                                label="Long"
                                value={lng}
                                onChange={onChangeLng}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        sx={{ display: "flex", flex: "1" }}
                        size="small"
                        id="placeOfSafety"
                        label="Place of Safety"
                        value={placeOfSafety}
                        onChange={onChangePlaceOfSafety}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

// Exporting the component
export default General;

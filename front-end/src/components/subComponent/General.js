// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - General.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):

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
    const { conductedBy, eIC, dateTime, physLoc, lat, lng, placeOfSafety 
    } = props;

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: "10rem" }}
                        size="small"
                        id="conductedBy"
                        label="Conducted By"
                        value={conductedBy}
                        onChange={onChangeConductedBy}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        sx={{ display: "flex", flex: "1", minWidth: "10rem" }}
                        size="small"
                        id="eic"
                        label="EIC"
                        value={eIC}
                        onChange={onChangeEIC}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2}>
                    <TimePicker
                        id="time"
                        label="Time"
                        value={dateTime}
                        onChange={(newDateTime) =>
                            onChangeDateTime(newDateTime)
                        }
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
                <Grid item xs={12} sm={6} md={2} lg={2}>
                    <DesktopDatePicker
                        id="date"
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={dateTime}
                        onChange={(newDateTime) =>
                            onChangeDateTime(newDateTime)
                        }
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
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex", flex: "1", minWidth: "10rem" }}
                        size="small"
                        id="location"
                        label="Physical Loc"
                        value={physLoc}
                        onChange={onChangePhysLoc}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flex: "1" }}>
                        <IconButton
                            color="primary"
                            size="small"
                            onClick={onLocFindClick}
                        >
                            <LocationOnIcon />
                        </IconButton>
                        <TextField
                            sx={{ flex: "1", minWidth: "5rem" }}
                            size="small"
                            id="lat"
                            label="Lat"
                            value={lat}
                            onChange={onChangeLat}
                        />
                        <TextField
                            sx={{ flex: "1", minWidth: "5rem" }}
                            size="small"
                            id="lng"
                            label="Long"
                            value={lng}
                            onChange={onChangeLng}
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

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Emergency.js
// January 1, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

/**
 * The Emergency Component will display the form fields required 
 * in an emergency situation
 *
 * @returns
 */
function Emergency(props) {
    // Destructuring the needed methods from props
    const {
        onChangeNearestHospital,
        onChangeCPR,
        onChangeAccessPoint,
        onChangeCaller,
        onChangeEvacRoute,
        onChangeMedInfo,
    } = props;
    // Destructuring the needed variable from props
    const { nearestHospital, cPR, accessPoint, caller, evacRoute, medInfo } =
        props;

    return (
        <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 400 }}>
                Emergency Plan
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="nearestHospital"
                        label="Nearest Hospital"
                        value={nearestHospital}
                        onChange={onChangeNearestHospital}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="cPR"
                        label="CPR/First Aid"
                        value={cPR}
                        onChange={onChangeCPR}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="accessPoint"
                        label="Access Point"
                        value={accessPoint}
                        onChange={onChangeAccessPoint}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="caller"
                        label="Caller"
                        value={caller}
                        onChange={onChangeCaller}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="evacRoute"
                        label="Evac Route"
                        value={evacRoute}
                        onChange={onChangeEvacRoute}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="medInfo"
                        label="Shared Med Info"
                        value={medInfo}
                        onChange={onChangeMedInfo}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Emergency;

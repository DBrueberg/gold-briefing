// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Exposure.js
// December 28, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

/**
 * The Exposure Component will display one of the Primary Exposure
 * fields
 *
 * @returns
 */
function Exposure(props) {
    // Destructuring the needed methods from props
    const { onChangeRiskExposure, onChangeProtMitigation } = props;
    // Destructuring the needed variable from props
    const { exposure } = props;

    return (
        <Box>
            <Typography
                variant="h6"
                component="h3"
                sx={{ textAlign: "left", marginLeft: 1, fontSize: "medium" }}
            >
                {exposure?.name}
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        multiline
                        rows={2}
                        id="riskExposure"
                        label="Risk/Exposure"
                        value={exposure?.riskExposure}
                        onChange={(e) => onChangeRiskExposure(e, exposure)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        multiline
                        rows={2}
                        id="protMitigation"
                        label="Protection/Mitigation"
                        value={exposure?.protMitigation}
                        onChange={(e) => onChangeProtMitigation(e, exposure)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Exposure;

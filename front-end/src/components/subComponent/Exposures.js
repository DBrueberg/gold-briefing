// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Exposures.js
// December 31, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/02/2023, Passed down index in props to allow for unique
//      child id creation)

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Box, Typography } from "@mui/material";
import Exposure from "./Exposure";

/**
 * The Exposures Component will display the needed Exposure
 * Components
 *
 * @returns
 */
function Exposures(props) {
    // Destructuring the needed methods from props
    const { onChangeRiskExposure, onChangeProtMitigation } = props;
    // Destructuring the needed variable from props
    const { primaryExposures } = props;

    return (
        <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 400 }}>
                Primary Exposures
            </Typography>
            {primaryExposures.length > 0 && primaryExposures.map((exposure, index) => (
                <Exposure
                    exposure={exposure}
                    key={index}
                    index={index}
                    onChangeRiskExposure={onChangeRiskExposure}
                    onChangeProtMitigation={onChangeProtMitigation}
                />
            ))}
        </Box>
    );
}

export default Exposures;

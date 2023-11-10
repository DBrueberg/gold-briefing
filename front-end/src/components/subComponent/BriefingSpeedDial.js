// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - BriefingSpeedDial.js
// October 31, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useState } from "react";

/**
 * The GenerateBriefing Component will allow the user to create or
 * close out a briefing
 *
 * @returns
 */
function BriefingSpeedDial(props) {
    // Destructuring the needed methods from props
    const { handleSpeedDialClick } = props;
    // Destructuring the needed variable from props
    const { actions } = props;

    return (
        <Box>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                    "& .MuiFab-primary": { maxWidth: 35, maxHeight: 35 },
                    mx: ".5rem",
                }}
                icon={<SpeedDialIcon />}
                direction="left"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        sx={{ maxWidth: 35, maxHeight: 35 }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleSpeedDialClick(action.name)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

export default BriefingSpeedDial;

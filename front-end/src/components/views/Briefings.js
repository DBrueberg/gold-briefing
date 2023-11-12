// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Briefings.js
// November 12, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import { Box, Typography } from "@mui/material";
import React from "react";
import BriefingList from "../subComponent/BriefingList";

/**
 * The Briefings View will display a list of saved briefings that
 * allow the user to perform load or delete.
 *
 * @param {*} props
 * @returns
 */
function Briefings(props) {
    // Destructuring the needed methods from props
    const {} = props;
    // Destructuring the needed variable from props
    const {} = props;

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexShrink: 1,
                    justifyContent: { xs: "center", md: "space-between" },
                    mx: 1,
                }}
            >
                <img
                    sx={{ display: "flex", flexShrink: "1" }}
                    src="bnsflogo.gif"
                    alt="Briefing Logo"
                />
                <Typography variant="h3" component="h2">
                    Briefings
                </Typography>
            </Box>
            <BriefingList />
        </Box>
    );
}

// Exporting the component
export default Briefings;

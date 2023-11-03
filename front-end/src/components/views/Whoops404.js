// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Whoops404.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import { Box, Typography } from "@mui/material";
import React from "react";

/**
 * The Whoops404 view is the page the user is sent to when the
 * navigation is incorrect.
 *
 * @param {*} props
 * @returns
 */
function Whoops404(props) {
    return (
        <Box>
            <Typography>Sorry there is nothing to be found here!</Typography>
        </Box>
    );
}

// Exporting the component
export default Whoops404;

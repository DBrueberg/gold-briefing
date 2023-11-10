// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefing.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/28/2022, Adjusted aesthetics of heading and added a logo)

// Using React library in order to build components
// for the app and importing needed components
import { Box, Typography } from "@mui/material";
import React from "react";
import JobBriefingForm from "../form/JobBriefingForm";
import Debrief from "../modal/Debrief";

/**
 * The JobBriefing View will display a completed job briefing that will need
 * to be filled out by the work group
 *
 * @param {*} props
 * @returns
 */
function JobBriefing(props) {
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
                <Typography variant="h3" component="h1">
                    Job Safety Briefing
                </Typography>
            </Box>
            <JobBriefingForm />
        </Box>
    );
}

// Exporting the component
export default JobBriefing;

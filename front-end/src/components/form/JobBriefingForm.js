// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import General from '../subComponent/General';
import { Box } from '@mui/material';

/**
 * The JobBriefingForm View will display a completed job briefing form
 * that will generate a full job briefing
 * 
 * @param {*} props 
 * @returns 
 */
function JobBriefingForm(props) {

    return (
        <Box component="form" sx={{
            '& .MuiTextField-root': { m:1 },
        }}>
            <General />
        </Box>
    )
}


// Exporting the component
export default JobBriefingForm;
// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Gold-Briefing - MainTemplate.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import App from '../../App';
import { Box } from '@mui/material';
import MainNav from '../subComponent/MainNav';

/**
 * This function will build a page template that accepts 
 * children sandwiched between the main navigation and 
 * the footer.
 * 
 * @returns 
 */
function MainTemplate() {
    return (
        <Box>
            <MainNav />
            <App/>
        </Box>
    )
}

// Exporting the PageTemplate component
export default MainTemplate;
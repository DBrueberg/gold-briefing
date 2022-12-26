// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefing.js
// December 23, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import JobBriefingForm from '../form/JobBriefingForm';

/**
 * The JobBriefing View will display a completed job briefing that will need 
 * to be filled out by the work group
 * 
 * @param {*} props 
 * @returns 
 */
function JobBriefing(props) {

    return (
        <div>
            <h1>
                Job Safety Briefing
            </h1>
            <JobBriefingForm />
        </div>
    )
}


// Exporting the component
export default JobBriefing;
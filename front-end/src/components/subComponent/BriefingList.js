// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Exposures.js
// December 31, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import Exposure from "./Exposure";

/**
 * The Exposures Component will display the needed Exposure
 * Components
 *
 * @returns
 */
function BriefingList(props) {
    // Destructuring the needed methods from props
    const { onChangeRiskExposure, onChangeProtMitigation } = props;
    // Destructuring the needed variable from props
    const { primaryExposures } = props;

    const Briefing = (props) => (
        <List>
           <ListItem
           
            sx={{ width: { xs: "100%", sm: "50%", md: "40%" }, mx: "auto" }}
        >
            <ListItemText primary="Harah!" />
            <Button variant="contained" sx={{ mx: ".25rem" }}>Delete</Button>
            <Button variant="contained" sx={{ mx: ".25rem" }}>Load</Button>
        </ListItem> 
        </List>
        
    );

    return (
        <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 400 }}>
                Primary Exposures
            </Typography>
            <Briefing />
        </Box>
    );
}

export default BriefingList;

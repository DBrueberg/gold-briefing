// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - BriefingList.js
// November 12, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import sampleData from "../../redux/sampleData.json";

/**
 * The BriefingList Component will load in a list of saved 
 * job briefings and display them in list form.
 *
 * @returns
 */
function BriefingList(props) {
    // Destructuring the needed methods from props
    const {} = props;
    // Destructuring the needed variable from props
    const {} = props;

    // Pulling the briefingList from the sample data
    const { briefingList } = sampleData;

    // This function will will allow a user to delete a saved 
    // job briefing using its id
    const handleDeleteClick = (id) => {
        console.log("Delete was clicked on BriefingList page");
        // Need delete confirm model
    };

    // This function will allow a user to load in a new job 
    // briefing based off its id
    const handleLoadClick = (id) => {
        console.log("Load was clicked on BriefingList page");
        // Might need a new route that uses :id, will look into 
        // options. May just load current into state
    };

    // The Briefing Component contains a single briefing data 
    // and allows the user to either choose delete or load
    const Briefing = (props) => (
        <List>
            <ListItem
                sx={{ width: { xs: "100%", sm: "50%", md: "40%" }, mx: "auto" }}
            >
                <ListItemText primary={props.briefing?.briefingName} />
                <Button
                    variant="contained"
                    sx={{ mx: ".25rem" }}
                    onClick={() => handleDeleteClick(props.briefing.id)}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    sx={{ mx: ".25rem" }}
                    onClick={() => handleLoadClick(props.briefing.id)}
                >
                    Load
                </Button>
            </ListItem>
        </List>
    );

    return (
        <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 400 }}>
                Primary Exposures
            </Typography>
            {briefingList.length > 0 &&
                briefingList.map((briefing, index) => (
                    <Briefing
                        briefing={briefing}
                        key={index}
                        handleDeleteClick={handleDeleteClick}
                        handleLoadClick={handleLoadClick}
                    />
                ))}
        </Box>
    );
}

export default BriefingList;

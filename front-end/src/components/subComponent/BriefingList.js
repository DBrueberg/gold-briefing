// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - BriefingList.js
// November 12, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import {
    getAllJobBriefingsThunk,
    getOneJobBriefingThunk,
} from "../../actions/thunks/jobBriefing.thunk.action";

/**
 * The BriefingList Component will load in a list of saved
 * job briefings and display them in list form.
 *
 * @returns
 */
function BriefingList(props) {
    // Destructuring the needed methods from props
    const { getAllJobBriefingsThunk, getOneJobBriefingThunk } = props;
    // Destructuring the needed variable from props
    const { briefingList, user } = props;
    const navigate = useNavigate();

    useEffect(() => {
        // This will be used to load in the briefing list
        // from the database

        // If there is a userId in state, that users briefins will load
        if (user.userId) {
            console.log("BriefingList page loaded");
            loadBriefings(user.userId);
        }
    }, []);

    // This function will will allow a user to delete a saved
    // job briefing using its id
    const handleDeleteClick = (id) => {
        console.log("Delete was clicked on BriefingList page");
        // Need delete confirm model
    };

    // This function will allow a user to load in a new job
    // briefing based off its id
    const handleLoadClick = async (briefingId) => {
        // Might need a new route that uses :id, will look into
        // options. May just load current into state
        const response = await getOneJobBriefingThunk(briefingId);
        if (response === 200) {
            // Send the user to the briefing page
            navigate("/");
        }
    };

    // The loadBriefings method will async request and load the job briefings if there are any
    const loadBriefings = async () => {
        await getAllJobBriefingsThunk(user.userId);
    };

    const isBriefingList = briefingList?.length > 0;

    // The Briefing Component contains a single briefing data
    // and allows the user to either choose delete or load
    const Briefing = (props) => (
        <List>
            <ListItem sx={{ width: { xs: "100%", sm: "50%", md: "40%" }, mx: "auto" }}>
                <ListItemText primary={props.briefing?.briefingName} />
                <Button
                    variant="contained"
                    sx={{ mx: ".25rem" }}
                    onClick={() => handleDeleteClick(props.briefing.briefingId)}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    sx={{ mx: ".25rem" }}
                    onClick={() => handleLoadClick(props.briefing.briefingId)}
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
            {briefingList?.length > 0 &&
                briefingList.map((briefing, index) => (
                    <Briefing
                        briefing={briefing}
                        key={index}
                        handleDeleteClick={() => handleDeleteClick}
                        handleLoadClick={() => handleLoadClick(briefing.briefingId)}
                    />
                ))}
        </Box>
    );
}
const mapStateToProps = (state) => {
    return {
        briefingList: state.briefingList,
        user: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllJobBriefingsThunk: (id) => dispatch(getAllJobBriefingsThunk(id)),
        getOneJobBriefingThunk: (id) => dispatch(getOneJobBriefingThunk(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BriefingList);

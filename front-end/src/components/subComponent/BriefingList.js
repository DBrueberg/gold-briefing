// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - BriefingList.js
// November 12, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/26/2025, Added in the getAll, getOne, and delete JobBriefing Thunks
//      Also added in basic component functionality to use these state and database
//      calls)
//  (DAB, 05/11/2025, Added in spinners and backdrop for database loads)

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import {
    deleteJobBriefingThunk,
    getAllJobBriefingsThunk,
    getOneJobBriefingThunk,
} from "../../actions/thunks/jobBriefing.thunk.action";
import {
    endLoadingDeleteBriefing,
    endLoadingLoadBriefing,
    startLoadingDeleteBriefing,
    startLoadingLoadBriefing,
} from "../../actions/isLoading.action";

/**
 * The BriefingList Component will load in a list of saved
 * job briefings and display them in list form.
 *
 * @returns
 */
function BriefingList(props) {
    // Destructuring the needed methods from props
    const {
        getAllJobBriefingsThunk,
        getOneJobBriefingThunk,
        deleteJobBriefingThunk,
        startLoadingDeleteBriefing,
        endLoadingDeleteBriefing,
        startLoadingLoadBriefing,
        endLoadingLoadBriefing,
    } = props;
    // Destructuring the needed variable from props
    const { briefingList, user, isLoading } = props;
    const navigate = useNavigate();

    // State will open and close the backdrop spinner
    const [openBackdrop, setOpenBackdrop] = useState(false);

    // useEffect will make needed calls when state changes
    useEffect(() => {
        // This will be used to load in the briefing list
        // from the database

        // If there is a userId in state, that users briefins will load
        if (user.userId) {
            // async method will load the briefings for the user
            loadBriefings(user.userId);
        }
    }, []);

    // This function will will allow a user to delete a saved
    // job briefing using its id
    const handleDeleteClick = async (briefingId) => {
        // isLoading state for delete briefing is set to true
        startLoadingDeleteBriefing();
        handleOpenBackdrop();
        // Deleting the job briefing from both state and the database
        const response = await deleteJobBriefingThunk(briefingId)
            .then((response) => {
                // isLoading state for delete briefing is set to false
                endLoadingDeleteBriefing();
                handleCloseBackdrop();
                return response;
            })
            .catch((response) => {
                // isLoading state for delete briefing is set to false
                endLoadingDeleteBriefing();
                handleCloseBackdrop();
                return response;
            });

        // If successful the job briefing is deleted
        if (response === 200) {
            // Nothing to add currently
            // console.log("Briefing updated successfully");
        }
    };

    // Will handle what happens when the backdrop closes
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    // This function will allow a user to load in a new job
    // briefing based off its id
    const handleLoadClick = async (briefingId) => {
        // isLoading state for load briefing is set to true
        startLoadingLoadBriefing();
        handleOpenBackdrop();
        // Might need a new route that uses :id, will look into
        // options. May just load current into state
        const response = await getOneJobBriefingThunk(briefingId)
            .then((response) => {
                // isLoading state for load briefing is set to false
                endLoadingLoadBriefing();
                handleCloseBackdrop();
                return response;
            })
            .catch((response) => {
                // isLoading state for load briefing is set to false
                endLoadingLoadBriefing();
                handleCloseBackdrop();
                return response;
            });

        // If successful the user is sent to the job briefing page
        if (response === 200) {
            // Send the user to the briefing page
            navigate("/");
        }
    };

    // Will handle what happens when the backdrop opens
    const handleOpenBackdrop = () => {
        setOpenBackdrop(true);
    };

    // The loadBriefings method will async request and load the job briefings if there are any
    const loadBriefings = async () => {
        // Async loading all job briefings for the user
        await getAllJobBriefingsThunk(user.userId);
    };

    // Checking if there are brieifings in briefingList
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
            {isBriefingList &&
                briefingList.map((briefing, index) => (
                    <Briefing
                        briefing={briefing}
                        key={index}
                        handleDeleteClick={() => handleDeleteClick}
                        handleLoadClick={() => handleLoadClick(briefing.briefingId)}
                    />
                ))}
            <Backdrop open={openBackdrop} onClick={handleCloseBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

// Maping state and dispatch to props
const mapStateToProps = (state) => {
    return {
        briefingList: state.briefingList,
        user: state.user,
        isLoading: state.isLoading,
    };
};

// Maping and loading dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        getAllJobBriefingsThunk: (id) => dispatch(getAllJobBriefingsThunk(id)),
        getOneJobBriefingThunk: (id) => dispatch(getOneJobBriefingThunk(id)),
        deleteJobBriefingThunk: (id) => dispatch(deleteJobBriefingThunk(id)),
        startLoadingDeleteBriefing: () => dispatch(startLoadingDeleteBriefing()),
        endLoadingDeleteBriefing: () => dispatch(endLoadingDeleteBriefing()),
        startLoadingLoadBriefing: () => dispatch(startLoadingLoadBriefing()),
        endLoadingLoadBriefing: () => dispatch(endLoadingLoadBriefing()),
    };
};

// Wrapping the component in connect to gain access to state and actions
export default connect(mapStateToProps, mapDispatchToProps)(BriefingList);

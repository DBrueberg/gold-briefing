// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - GenerateBriefing.js
// October 31, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/01/2023, Changed formfield error message to snackbar
//      and refactored some variables)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import {
    Checkbox,
    Button,
    FormGroup,
    FormControlLabel,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";
import Debrief from "../modal/Debrief";

/**
 * The GenerateBriefing Component will allow the user to create or
 * close out a briefing
 *
 * @returns
 */
function GenerateBriefing(props) {
    // Destructuring the needed methods from props
    const {} = props;
    // Destructuring the needed variable from props
    const {} = props;

    // Defining default settings for the local state
    const [briefErrorSnackbarOpen, setBriefErrorSnackbarOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isDebriefed, setIsDebriefed] = useState(false);
    const [open, setOpen] = useState(false);

    // Function that will handle the close briefing actions
    const handleCloseBriefing = (e) => {
        if (checked) {
            handleDebriefOpen();
        } else {
            handleBriefSnackbarOpen();
        }
    };

    // Function that will handle the create briefing actions
    const handleCreateBriefing = (e) => {
        console.log("createBrief");
    };

    // Function that will handle the change briefing actions
    const handleBriefChange = (e) => {
        setChecked(e.target.checked);
    };

    // Function that will handle the actions to be taken on the
    // briefing snackbar error close
    const handleBriefSnackbarClose = () => {
        setBriefErrorSnackbarOpen(false);
    };

    // Function that will handle the actions to be taken on the
    // briefing snackbar error open
    const handleBriefSnackbarOpen = () => {
        setBriefErrorSnackbarOpen(true);
    };

    // Function that will handle the changes to the debrief Dialog close
    const handleDebriefClose = (isDebrief) => {
        setOpen(false);
        setIsDebriefed(isDebrief);
    };

    // Function that will handle the changes to the debrief Dialog open
    const handleDebriefOpen = () => {
        setOpen(true);
    };

    return (
        <Stack
            direction={{ sm: "row" }}
            justifyContent={{ xs: "center", md: "end" }}
            flexWrap={"wrap"}
            spacing={{ xs: 1 }}
            marginRight={1}
            marginBottom={1}
        >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            id="briefCheckBox"
                            checked={checked}
                            onChange={handleBriefChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    }
                    label="Has entire workgroup been briefed?"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                />
            </FormGroup>
            <Button
                sx={{ minWidth: "7rem" }}
                variant="contained"
                onClick={(e) => handleCreateBriefing()}
            >
                Create Briefing
            </Button>
            <Button
                sx={{ minWidth: "7rem" }}
                variant="contained"
                onClick={(e) => handleCloseBriefing()}
            >
                Close Briefing
            </Button>
            <Debrief open={open} onClose={handleDebriefClose} />
            <Snackbar
                open={briefErrorSnackbarOpen}
                autoHideDuration={4000}
                onClose={handleBriefSnackbarClose}
            >
                <Alert severity="error">Brief first</Alert>
            </Snackbar>
        </Stack>
    );
}

export default GenerateBriefing;

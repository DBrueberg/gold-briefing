// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - GenerateBriefing.js
// October 31, 2023
// Last Edited (Initials, Date, Edits):


/**
 * STILL WORKING ON FUNCTIONALITY. 
 * Need to add comments
 * Need to organize code
 * Better descriptive name for error variable
 * Thinking of switching FormControl error handling of debrief
 * checkbox to a snackbar error message for better UX
 */

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import {
    Checkbox,
    Button,
    FormGroup,
    FormControlLabel,
    FormControl,
    Stack,
    FormHelperText,
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

    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDebriefed, setIsDebriefed] = useState(false);
    const [error, setError] = useState(false);

    const handleDebriefOpen = () => {
        setOpen(true);
    };

    const handleDebriefClose = (isDebrief) => {
        setOpen(false);
        setIsDebriefed(isDebrief);
        console.log(isDebrief);
    };

    const handleBriefChange = (e) => {
        setChecked(e.target.checked);
        console.log(e.target.checked);
    };

    const createBriefHandler = (e) => {
        console.log("createBrief");
    };

    const closeBriefHandler = (e) => {
        console.log("closeBriefHandler");
        if (checked) {
            handleDebriefOpen();
            console.log("CLOSING BRIEFING");
            setError(false);
        } else {
            console.log("BRIEF FIRST!");
            setError(true);
        }
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
            <FormControl required error={error} component="fieldset">
                {error && (
                    <FormHelperText>
                        Entire workgroup must be briefed
                    </FormHelperText>
                )}
            </FormControl>
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
                onClick={(e) => createBriefHandler()}
            >
                Create Briefing
            </Button>
            <Button
                sx={{ minWidth: "7rem" }}
                variant="contained"
                onClick={(e) => closeBriefHandler()}
            >
                Close Briefing
            </Button>
            <Debrief open={open} onClose={handleDebriefClose} />
            {console.log(isDebriefed)}
        </Stack>
    );
}

export default GenerateBriefing;

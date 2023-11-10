// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Debrief.js
// October 27, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 10/31/2023, Added limited functionality and error handling)
//  (DAB, 11/01/2023, Added comments and sorted out functionality)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Stack,
    Divider,
    FormHelperText,
    FormControl,
    TextField,
} from "@mui/material";

/**
 * The Debrief Dialog Component will allow the user to go through the
 * required debriefing checklist
 *
 * @returns
 */
function SaveJobBriefing(props) {
    // Destructuring the needed methods from props
    const { onClose } = props;
    // Destructuring the needed variable from props
    const { open } = props;

    // Defining default settings for the local state
    const [error, setError] = useState(false);
    const [briefingName, setBriefingName] = useState("");

    // This function will handle the changes to checkbox 3
    const onChangeBriefingName = (e) => {
        const { value } = e.target;
        setBriefingName(value);
    };

    // Function will handle what happens when the Dialog is closed
    const handleClose = () => {
        onClose(false);
        setError(false);
    };

    // Function will handle what happens when the confirm debrief button is
    // pressed
    const handleSaveName = () => {
        const isName = isNameEntered();
        if (isName) {
            onClose(briefingName);
            setBriefingName("");
            setError(false);
        } else {
            setError(true);
        }
    };

    // This function checks to see if all the checkbox options are checked and
    // returns true if true
    const isNameEntered = () => {
        return briefingName.length > 0;
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle
                sx={{
                    border: "bottom",
                    borderColor: "black",
                    mb: 0,
                    pb: 1,
                }}
                alignSelf={"center"}
            >
                What do you want to call this briefing?
            </DialogTitle>
            <Divider />
            <DialogActions>
                <FormControl required error={error} component="fieldset" sx={{width:"100%"}}>
                    <Stack spacing={1}>
                            <TextField
                                id="briefingName"
                                label="Briefing Name"
                                autoComplete="briefing-name"
                                required
                                value={briefingName}
                                onChange={onChangeBriefingName}
                                size="small"
                            />
                            <Button
                                sx={{ minWidth: "7rem" }}
                                variant="contained"
                                onClick={(e) => handleSaveName()}
                            >
                                Save
                            </Button>
                        <FormHelperText sx={{ textAlign:"center" }}>
                            Enter a name.
                        </FormHelperText>
                    </Stack>
                </FormControl>
            </DialogActions>
        </Dialog>
    );
}

export default SaveJobBriefing;

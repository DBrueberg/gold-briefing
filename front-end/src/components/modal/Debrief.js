// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Debrief.js
// October 27, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 10/31/2023, Added limited functionality and error handling)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Divider,
    FormHelperText,
    FormControl,
} from "@mui/material";

/**
 * The Debrief Dialog Component will allow the user to go through the
 * required debriefing checklist
 *
 * @returns
 */
function Debrief(props) {
    // Destructuring the needed methods from props
    const { onClose } = props;
    // Destructuring the needed variable from props
    const { open } = props;

    const [checked, setChecked] = useState([false, false, false, false]);
    const [error, setError] = useState(false);

    const dialogChoices = [
        "Boom and outriggers properly stored?",
        "Flags properly removed or replaced?",
        "Switches or derails properly lined/applied/removed?",
        "All workgroups clear of authorities/track?",
    ];

    const handleConfirmDebrief = () => {
        const isChecked = isAllChecked();
        if (isChecked) {
            console.log("GOOD TO CLOSE BRIEFING");
            onClose(isChecked);
            setChecked([false, false, false, false]);
            setError(false);
        } else {
            console.log("All FIELDS MUST BE CHECKED TO CLOSE BRIEFING");
            setChecked([false, false, false, false]);
            setError(true);
        }
    };

    const handleClose = () => {
        onClose(false);
        setChecked([false, false, false, false]);
        setError(false);
    };

    const handleChange0 = (e) => {
        setChecked([e.target.checked, checked[1], checked[2], checked[3]]);
        console.log(checked);
    };
    const handleChange1 = (e) => {
        setChecked([checked[0], e.target.checked, checked[2], checked[3]]);
        console.log(checked);
    };
    const handleChange2 = (e) => {
        setChecked([checked[0], checked[1], e.target.checked, checked[3]]);
        console.log(checked);
    };
    const handleChange3 = (e) => {
        setChecked([checked[0], checked[1], checked[2], e.target.checked]);
        console.log(checked);
    };

    const isAllChecked = () => {
        return checked[0] && checked[1] && checked[2] && checked[3] === true;
    };

    return (
        <Dialog dividers onClose={handleClose} open={open}>
            <DialogTitle
                sx={{
                    border: "bottom",
                    borderColor: "black",
                    mb: 0,
                    pb: 1,
                }}
                alignSelf={"center"}
            >
                Debrief
            </DialogTitle>
            <Divider />
            <DialogActions>
                <FormControl required error={error} component="fieldset">
                    <Stack>
                        <FormGroup>
                            <FormControlLabel
                                required
                                control={
                                    <Checkbox
                                        id="debriefCheck0"
                                        checked={checked[0]}
                                        onChange={handleChange0}
                                    />
                                }
                                label={dialogChoices[0]}
                            />
                            <FormControlLabel
                                required
                                control={
                                    <Checkbox
                                        id="debriefCheckBox1"
                                        checked={checked[1]}
                                        onChange={handleChange1}
                                    />
                                }
                                label={dialogChoices[1]}
                            />
                            <FormControlLabel
                                required
                                control={
                                    <Checkbox
                                        id="debriefCheckBox2"
                                        checked={checked[2]}
                                        onChange={handleChange2}
                                    />
                                }
                                label={dialogChoices[2]}
                            />
                            <FormControlLabel
                                required
                                helperText="Work group must be briefed"
                                control={
                                    <Checkbox
                                        id="debriefCheckBox3"
                                        checked={checked[3]}
                                        onChange={handleChange3}
                                    />
                                }
                                label={dialogChoices[3]}
                            />
                        </FormGroup>
                        <Stack direction="row" justifyContent={"space-around"}>
                            <Button
                                sx={{ minWidth: "7rem" }}
                                variant="contained"
                                onClick={(e) => handleConfirmDebrief()}
                            >
                                Confirm
                            </Button>
                        </Stack>
                        <FormHelperText sx={{ mx: "auto" }}>
                            All boxes must be checked
                        </FormHelperText>
                    </Stack>
                </FormControl>
            </DialogActions>
        </Dialog>
    );
}

export default Debrief;

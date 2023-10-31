// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Debrief.js
// October 27, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Divider
} from "@mui/material";

/**
 * The Debrief Dialog Component will allow the user to go through the 
 * required debriefing checklist
 *
 * @returns
 */
function Debrief(props) {
    // Destructuring the needed methods from props
    const {} = props;
    // Destructuring the needed variable from props
    const {} = props;

    const dialogChoices = [
        "Boom and outriggers properly stored?",
        "Flags properly removed or replaced?",
        "Switches or derails properly lined/applied/removed?",
        "All workgroups clear of authorities/track?",
    ];

    return (
        <Dialog dividers open={true}>
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
                <Stack>
                    <FormGroup>
                        <FormControlLabel
                            required
                            control={<Checkbox />}
                            label={dialogChoices[0]}
                        />
                        <FormControlLabel
                            required
                            control={<Checkbox />}
                            label={dialogChoices[1]}
                        />
                        <FormControlLabel
                            required
                            control={<Checkbox />}
                            label={dialogChoices[2]}
                        />
                        <FormControlLabel
                            required
                            control={<Checkbox />}
                            label={dialogChoices[3]}
                        />
                    </FormGroup>
                    <Stack direction="row" justifyContent={"space-around"}>
                        <Button sx={{ minWidth: "7rem" }} variant="contained">
                            Confirm
                        </Button>
                        <Button sx={{ minWidth: "7rem" }} variant="contained">
                            Back
                        </Button>
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}

export default Debrief;

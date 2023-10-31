// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - GenerateBriefing.js
// October 31, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import {
    Checkbox,
    Button,
    FormGroup,
    FormControlLabel,
    Stack,
} from "@mui/material";

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
                    control={<Checkbox/>}
                    label="Has entire workgroup been briefed?"
                    sx={{
                        display:"flex",
                        justifyContent:"center"
                    }}
                />
            </FormGroup>

            <Button sx={{ minWidth: "7rem" }} variant="contained">
                Create Briefing
            </Button>
            <Button sx={{ minWidth: "7rem" }} variant="contained">
                Close Briefing
            </Button>
        </Stack>
    );
}

export default GenerateBriefing;

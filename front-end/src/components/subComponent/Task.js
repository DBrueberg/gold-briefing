// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Task.js
// December 28, 2022
// Last Edited (Initials, Date, Edits):

import React from "react";
import { Box, Grid, TextField } from "@mui/material";

/**
 * The Task Component will allow access to the task details and
 * the rules applicable to the task
 *
 * @returns
 */
function Task(props) {
    // Destructuring the needed methods from props
    const { onChangeTaskDetails, onChangeTaskRules } = props;
    // Destructuring the needed variable from props
    const { taskDetails, taskRules } = props;

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="taskDetails"
                        multiline
                        rows={2}
                        label="Task Details"
                        value={taskDetails}
                        onChange={onChangeTaskDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="taskRules"
                        multiline
                        rows={2}
                        label="Rules Applicable to Task"
                        value={taskRules}
                        onChange={onChangeTaskRules}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Task;

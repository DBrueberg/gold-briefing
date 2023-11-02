// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import sampleData from "../../redux/sampleData.json";

/**
 * The JobBriefingForm View will display a completed job briefing form
 * that will generate a full job briefing
 *
 * @param {*} props
 * @returns
 */
function LoginForm(props) {
    // Loading in the sample data, this is only temporary
    const {} = sampleData;

    // Local state to keep track of the user name and password
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // This function will handle the actions for the Login button
    const handleLogin = () => {
        console.log(`Logging in ${userName} with password ${password}`);

        // Clearing password entries
        setUserName("");
        setPassword("");
    };

    // This function will set the form fields contents to local state
    const onChangeUserName = (e) => {
        const { value } = e.target;
        setUserName(value);
    };

    // This function will set the form fields contents to local state
    const onChangePassword = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1 },
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <Stack justifyContent="center" sx={{ minWidth: "50%" }}>
                <TextField
                    id="userName"
                    label="User Name"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    required
                    value={userName}
                    onChange={onChangeUserName}
                />
                <TextField
                    id="password"
                    label="Password"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={onChangePassword}
                />
                <Button
                    sx={{ mx: ".5rem" }}
                    variant="contained"
                    onClick={(e) => handleLogin()}
                >
                    Login
                </Button>
                <Typography fontSize="small" mt={1}>
                    Create an account.
                </Typography>
            </Stack>
        </Box>
    );
}

// Exporting the component
export default LoginForm;

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Login.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import { Box, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../form/LoginForm";

/**
 * The Login View will display a Login page where the user 
 * can either login or link to the CreateAccount page.
 *
 * @param {*} props
 * @returns
 */
function Login(props) {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexShrink: 1,
                    justifyContent: { xs: "center", md: "space-between" },
                    mx: 1,
                }}
            >
                <img
                    sx={{ display: "flex", flexShrink: "1" }}
                    src="bnsflogo.gif"
                    alt="Briefing Logo"
                />
                <Typography variant="h3">Login</Typography>
            </Box>
            <LoginForm />
        </Box>
    );
}

// Exporting the component
export default Login;

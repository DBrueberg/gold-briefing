// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - CreateAccount.js
// November 7, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import { Box, Typography } from "@mui/material";
import React from "react";
import CreateAccountForm from "../form/CreateAccountForm";

/**
 * The Create Account view will display the Create Account
 * Form where the user can create and account.
 *
 * @param {*} props
 * @returns
 */
function CreateAccount(props) {
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
                <Typography variant="h3">Create Account</Typography>
            </Box>
            <CreateAccountForm />
        </Box>
    );
}

// Exporting the component
export default CreateAccount;

// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - CreateAccountForm.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import sampleData from "../../redux/sampleData.json";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "../../helperFunction/FormatString";

/**
 * The CreateAccountForm View will handle the form needed for
 * a user to create their account.
 *
 * @param {*} props
 * @returns
 */
function CreateAccountForm(props) {
    // Loading in the sample data, this is only temporary
    const {} = sampleData;

    // Local state to keep track of the user name and password
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // This function will handle the actions for the Create Account button
    const handleCreateAccount = () => {
        console.log(
            `Fields are ${fName}, ${lName}, ${phone}, and ${email} with password ${password}`
        );

        // Clearing password entries
        setFName("");
        setLName("");
        setPhone("");
        setEmail("");
        setPassword("");
    };

    // This function will set the form fields contents to local state
    const onChangeFName = (e) => {
        const { value } = e.target;
        setFName(value);
    };

    // This function will set the form fields contents to local state
    const onChangeLName = (e) => {
        const { value } = e.target;
        setLName(value);
    };

    // This function will set the form fields contents to local state
    const onChangePhone = (e) => {
        const { value } = e.target;
        const rawNumber = formatPhoneNumber(value);
        // rawNumber needs to be length = 14
        setPhone(rawNumber);
    };

    // This function will set the form fields contents to local state
    const onChangeEmail = (e) => {
        const { value } = e.target;
        setEmail(value);
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
                    id="fName"
                    label="First Name"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    autoComplete="firstname"
                    required
                    value={fName}
                    onChange={onChangeFName}
                />
                <TextField
                    id="lName"
                    label="Last Name"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    autoComplete="lastname"
                    required
                    value={lName}
                    onChange={onChangeLName}
                />
                <TextField
                    id="phone"
                    label="Phone"
                    size="small"
                    type="phone"
                    sx={{ minWidth: "50%" }}
                    autoComplete="phone"
                    required
                    value={phone}
                    onChange={onChangePhone}
                />
                <TextField
                    id="email"
                    label="Email"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={onChangeEmail}
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
                    onClick={(e) => handleCreateAccount()}
                >
                    Create Account
                </Button>
            </Stack>
        </Box>
    );
}

// Exporting the component
export default CreateAccountForm;

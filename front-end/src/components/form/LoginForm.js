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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUserThunk } from "../../actions/thunks/authentication.thunk.action";
import { useNavigate } from "react-router-dom";

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
    const { loginUserThunk } = props;

    const navigate = useNavigate();

    // Local state to keep track of the user name and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // This function will handle the actions for the Login button
    const handleLogin = async () => {
        // Debug: comment out when not needed
        // console.log(`Logging in ${email} with password ${password}`);

        // Checking if the required form fields are filled out
        if (email && password) {
            // Formating form data to be sent to state and backend
            const loginData = {
                email: email,
                password: password,
            };

            // DEBUG: can be left in but also can be removed
            console.log("Logging in...");

            // Calling the thunk action to save the data to the database and redux state
            const response = await loginUserThunk(loginData);

            if (response === 200) {
                // If the login is successful, navigate to the home page
                console.log("Login successful");
                navigate("/");
            }
            if (response === 404) {
                // If the user/password combo does not exist, show an error message
                console.log("Invalid email or password");
            }
        }
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
                    id="email"
                    label="Email"
                    size="small"
                    sx={{ minWidth: "50%" }}
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
                    onClick={(e) => handleLogin()}
                >
                    Login
                </Button>
                <Typography component={Link} to="/createAccount" fontSize="small" mt={1}>
                    Create an account.
                </Typography>
            </Stack>
        </Box>
    );
}

// Map the dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        loginUserThunk: (userData) => dispatch(loginUserThunk(userData)),
    };
};

// Exporting the component
export default connect(null, mapDispatchToProps)(LoginForm);

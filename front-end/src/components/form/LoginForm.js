// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - JobBriefingForm.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/20/2025, Added needed Thunks to log a user into the database)
//  (DAB, 04/27/2025, Added in form validation)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import { Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
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
    // Loading in the needed methods and state from props
    const { loginUserThunk } = props;

    // Navigate will be used for SPA directs
    const navigate = useNavigate();

    // Local state to keep track of the user name and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Form validation state
    const [authenticationError, setAuthenticationError] = useState(false);
    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);

    // This function will handle the actions for the Login button
    const handleLogin = async () => {
        // Debug: comment out when not needed
        // console.log(`Logging in ${email} with password ${password}`);
        // Setting authentication error to false
        if (authenticationError) {
            setAuthenticationError(false);
        }

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

            // If the user validation passes the user is navigated to the briefing page
            if (response === 200) {
                // If the login is successful, navigate to the home page
                console.log("Login successful");
                navigate("/");
            }
            // If the password/email combo is not found the user is notified and the
            // form fields will show an error
            if (response === 404) {
                // If the user/password combo does not exist, show an error message
                console.log("Invalid email or password");
                setAuthenticationError(true);
                setSnackbarMessage("Invalid email or password.");
                handleSnackbarClick();
            }
            // If the network is down the user will be notified
            if (response === 503) {
                console.log("Network error");
                setSnackbarMessage("Network Error.");
                handleSnackbarClick();
            }
        }
    };

    // This method will handle actions when the snackbar is open
    const handleSnackbarClick = () => {
        setOpenSnackbar(true);
    };

    // This method will handle actions when the snackbar is closed
    const handleSnackbarClose = (e, reason) => {
        setOpenSnackbar(false);
        setSnackbarMessage(null);
    };

    // The handleSubmit method will handle the actions after the form is submitted
    const handleSubmit = (e) => {
        // Preventing default actions
        e.preventDefault();

        // The handleLogin method is called to log the user in and perform
        // database checks
        handleLogin();
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
            onSubmit={handleSubmit}
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
                    error={authenticationError}
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
                    error={authenticationError}
                    value={password}
                    onChange={onChangePassword}
                />
                <Button type="submit" sx={{ mx: ".5rem" }} variant="contained">
                    Login
                </Button>
                <Typography component={Link} to="/createAccount" fontSize="small" mt={1}>
                    Create an account.
                </Typography>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    message={snackbarMessage}
                    onClose={handleSnackbarClose}
                ></Snackbar>
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

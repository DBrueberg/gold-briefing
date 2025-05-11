// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - CreateAccountForm.js
// November 2, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 04/17/2025, Added in redux state and connect)
//  (DAB, 04/19/2025, Added in thunk action to add user)
//  (DAB, 04/27/2025, Added in form validation)
//  (DAB, 05/09/2025, maxLength added to match database restraints)
//  (DAB, 05/10/2025, added isLoading to prevent multiple database calls)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import { Box, Button, CircularProgress, Snackbar, Stack, TextField } from "@mui/material";
import { formatPhoneNumber } from "../../helperFunction/FormatString";
import { connect } from "react-redux";
import { addUserThunk } from "../../actions/thunks/user.thunk.action";
import { unformatPhoneNumber } from "../../helperFunction/FormatString";
import { useNavigate } from "react-router-dom";
import { endLoadingCreateAccount, startLoadingCreateAccount } from "../../actions/isLoading.action";

/**
 * The CreateAccountForm View will handle the form needed for
 * a user to create their account.
 *
 * @param {*} props
 * @returns
 */
function CreateAccountForm(props) {
    // Using the useNavigate hook to navigate to different routes
    const navigate = useNavigate();
    // Loading in state from redux connect
    const { isLoading } = props;

    // Loading in the redux thunk that will save to the database and state
    const { addUserThunk, startLoadingCreateAccount, endLoadingCreateAccount } = props;

    // Local state to keep track of the form fields
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Form validation state
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    // Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);

    // This function will handle the actions for the Create Account button
    const handleCreateAccount = async () => {
        // Checking that the form has no errors before making the database call
        if (isValidForm()) {
            // DEBUG: can be left in but also can be removed
            console.log("Creating account...");

            // Formating form data to be sent to state and backend
            const createAccountData = {
                fName: fName,
                lName: lName,
                pNum: unformatPhoneNumber(phone),
                email: email,
                permId: 1,
                password: password,
            };

            // Setting isLoading state to true
            startLoadingCreateAccount();

            // Adding the user to the redux state
            const response = await addUserThunk(createAccountData)
                .then((response) => {
                    endLoadingCreateAccount();
                    return response;
                })
                .catch((response) => {
                    endLoadingCreateAccount();
                    return response;
                });

            // If a successful account is created the user is added to state and
            // redirected to the briefing page
            if (response === 200) {
                console.log("User created successfully.");

                // Redirect to the briefing page on successful account creation
                navigate("/");
            }
            // If the user name is already taken, the user is notified
            if (response === 400) {
                console.log("User already exists.");
                setEmailError(true);
            }
            // If the server network doesn't respond the user will be notified
            if (response === 503) {
                console.log("Network Error.");
                setSnackbarMessage("Network Error, nothing has been saved!");
                handleSnackbarClick();
            }
        }
    };

    // This method will handle the actions needed when the snackbar opens
    const handleSnackbarClick = () => {
        setOpenSnackbar(true);
    };

    // This method will handle the actions needed when the snackbar closes
    const handleSnackbarClose = (e, reason) => {
        setOpenSnackbar(false);
        setSnackbarMessage(null);
    };

    // A compact form validation check, add any extra form validations here and
    // return the result as boolean
    const isValidForm = () => {
        // Checking that the phone number is 10 digits
        const isValidPhone = () => {
            const rawNumber = unformatPhoneNumber(phone);

            // The phone number needs to be the proper number of
            // digits
            if (rawNumber.length === 10) {
                setPhoneError(false);
                return true;
            }
            setPhoneError(true);
            return false;
        };

        // The isValid will contain the result of the extra form validation checks
        const isValid = isValidPhone();

        // Returning is the form is valid or not
        return isValid;
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
        // If the email threw an error then it is reset when edited
        if (emailError === true) {
            setEmailError(false);
        }
    };

    // This function will set the form fields contents to local state
    const onChangePassword = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    // This method will handle the actions after submitting the form
    const handleSubmit = (e) => {
        // Preventing default actions
        e.preventDefault();

        // The handleCreateAccount method will handle the methods needed to
        // create an account in the database
        handleCreateAccount();
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
                    id="fName"
                    type="text"
                    inputProps={{ maxLength: 50 }}
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
                    type="text"
                    inputProps={{ maxLength: 50 }}
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
                    error={phoneError}
                    helperText={phoneError ? "Number must be 10 digits" : ""}
                    value={phone}
                    onChange={onChangePhone}
                />
                <TextField
                    id="email"
                    type="email"
                    inputProps={{ maxLength: 50 }}
                    label="Email"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    autoComplete="email"
                    required
                    error={emailError}
                    helperText={emailError ? "Email already exists!" : ""}
                    value={email}
                    onChange={onChangeEmail}
                />
                <TextField
                    id="password"
                    type="password"
                    inputProps={{ maxLength: 50 }}
                    label="Password"
                    size="small"
                    sx={{ minWidth: "50%" }}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={onChangePassword}
                />

                {!isLoading.createAccount ? (
                    <Button type="submit" sx={{ mx: ".5rem" }} variant="contained">
                        Create Account
                    </Button>
                ) : (
                    <CircularProgress sx={{ mx: "auto" }} />
                )}

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

// Mapping state to props
const mapStateToProps = (state) => ({
    isLoading: { ...state.isLoading },
});

// Mapping the redux store states to props
const mapDispatchToProps = (dispatch) => ({
    addUserThunk: (userData) => dispatch(addUserThunk(userData)),
    startLoadingCreateAccount: () => dispatch(startLoadingCreateAccount()),
    endLoadingCreateAccount: () => dispatch(endLoadingCreateAccount()),
});

// Exporting the component
export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm);

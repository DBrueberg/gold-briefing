// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Acknowledgement.js
// January 1, 2023
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/23/2023, Changed the name and number variable names to 
//  align better with state for clarity)

// Using React library in order to build components
// for the app and importing needed components
import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";

/**
 * The Acknowledgement Component will display the form field that 
 * allows and displays those who have signed on to the briefing
 *
 * @returns
 */
function Acknowledgement(props) {
    // Destructuring the needed methods from props
    const { onClickAcknowledgement } = props;
    // Destructuring the needed variable from props
    const { acknowledgements } = props;

    // Local state to keep track of the name and phone
    const [employeeName, setEmployeeName] = useState("");
    const [employeePNum, setEmployeePNum] = useState("");

    // The handleClick method will handle the button click that 
    // adds a new member to acknowledgment state
    const handleClick = () => {
        // Verifying the name has a name in it
        if (employeeName !== "") {
            onClickAcknowledgement(employeeName, employeePNum);
        }

        // Clearing the form fields
        setEmployeeName("");
        setEmployeePNum("");
    };

    // Function that will handle changes to the caller field
    const onChangeName = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setEmployeeName(value);
    };

    // Function that will handle changes to the caller field
    const onChangePhone = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setEmployeePNum(value);
    };

    return (
        <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 400 }}>
                Workgroup Acknowledgement
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={5.25}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="name"
                        label="Name"
                        value={employeeName}
                        autoComplete="name"
                        onChange={onChangeName}
                    />
                </Grid>
                <Grid item xs={12} sm={5.25}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="phone"
                        label="Phone #"
                        value={employeePNum}
                        autoComplete="phone"
                        onChange={onChangePhone}
                    />
                </Grid>
                <Grid item xs={12} sm={1.5} sx={{ display: "flex" }}>
                    <Button
                        sx={{ display: "flex", my: "auto", mx: 1, flexGrow: 1 }}
                        variant="contained"
                        onClick={(e) => handleClick()}
                    >
                        Add
                    </Button>
                </Grid>
                <List
                    sx={{
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexGrow: 1,
                        maxWidth: "100%",
                    }}
                >
                    <Grid container>
                        {acknowledgements.length > 0 &&
                            acknowledgements.map((workerInfo, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <ListItem
                                        sx={{
                                            alignItems: "start",
                                            height: "100%",
                                        }}
                                    >
                                        <ListItemText
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                            primary={`${index + 1}.\u00A0${
                                                workerInfo.employeeName
                                            }`}
                                            secondary={workerInfo.employeePNum}
                                            primaryTypographyProps={{
                                                style: {
                                                    wordWrap: "break-word",
                                                },
                                            }}
                                        />
                                    </ListItem>
                                    <Divider />
                                </Grid>
                            ))}
                    </Grid>
                </List>
            </Grid>
        </Box>
    );
}

export default Acknowledgement;

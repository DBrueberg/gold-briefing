// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Acknowledgement.js
// January 1, 2023
// Last Edited (Initials, Date, Edits):

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
    const { acknowledgement } = props;

    // Local state to keep track of the name and phone
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // The handleClick method will handle the button click that 
    // adds a new member to acknowledgment state
    const handleClick = () => {
        // Verifying the name has a name in it
        if (name !== "") {
            onClickAcknowledgement(name, phone);
        }

        // Clearing the form fields
        setName("");
        setPhone("");
    };

    // Function that will handle changes to the caller field
    const onChangeName = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setName(value);
    };

    // Function that will handle changes to the caller field
    const onChangePhone = (e) => {
        // Destructuring the form field value to a variable
        const { value } = e.target;
        // Setting the new form field value to local state
        setPhone(value);
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
                        value={name}
                        onChange={onChangeName}
                    />
                </Grid>
                <Grid item xs={12} sm={5.25}>
                    <TextField
                        sx={{ display: "flex" }}
                        size="small"
                        id="phone"
                        label="Phone #"
                        value={phone}
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
                        {acknowledgement.length > 0 &&
                            acknowledgement.map((workerInfo, index) => (
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
                                                workerInfo.name
                                            }`}
                                            secondary={workerInfo.phone}
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

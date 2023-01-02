// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Widget.js
// January 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import WeatherDataService from "../../services/weather.service";

/**
 * The Widget Component will display widgets of the weather and 
 * map based off GPS location
 *
 * @returns
 */
function Widget(props) {
    // Destructuring the needed methods from props
    const {  } = props;
    // Destructuring the needed variable from props
    const {  } = props;

    const clickHandler = async() => {
        console.log("Button clicked")
        const response = await WeatherDataService.forecast("minneapolis, mn 55304");
        console.log(response);
        console.log(response.data);
    }

    return (
        <Box>
            <Typography>
                {/** I want  weather alerts, wind speed if over 30mph from current time */}
                Widget Component
            </Typography>
            <Card>

            </Card>
            <Button onClick={() => clickHandler()}>
                Update Weather
            </Button>
        </Box>
    );
}

export default Widget;
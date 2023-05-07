// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - Widget.js
// January 2, 2023
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    List,
    ListItemButton,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * The Widget Component will display widgets of the weather and
 * map based off GPS location
 *
 * @returns
 */
function Widget(props) {
    // Destructuring the needed methods from props
    const { onClickUpdateWeather, lat, lng } = props;
    // Destructuring the needed variable from props
    const { weather } = props;
    // const { weather } = sampleData

    // Adding in some default lat, lng, and zoom for the map
    const [center, setCenter] = useState([32.7555, -97.309341]);
    const [zoom, setZoom] = useState(16);

    // Using useEffect to rerender the map component when there is a 
    // change in lat/lng state
    useEffect (() => {
        if (lat !== "" || lng !== "") {
            setCenter([lat, lng])
            setZoom(16);
        }
    }, [lat, lng])

    const clickHandler = () => {
        onClickUpdateWeather();
    };

    const WeatherAlerts = () => (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="weatherAlert"
            >
                <Typography fontWeight={"400"} color="error">
                    Weather Alerts!
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ p: 0, m: 0 }}>
                    {weather &&
                        weather?.alerts?.length > 0 &&
                        weather.alerts.map((alert, index) => (
                            <Tooltip
                                key={index}
                                placement="top"
                                title={alert.description}
                            >
                                <ListItemButton>{alert.event}</ListItemButton>
                            </Tooltip>
                        ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );

    const WeatherCard = () => (
        <Card display="flex" sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6">
                    {weather.weatherLocation} Weather
                </Typography>
                <Typography variant="h7" fontSize={".9rem"}>
                    {weather.currentCondition}
                </Typography>
                <Grid container sx={{ marginBottom: "2rem" }}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            Rain: {weather.rain}%
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            Snow: {weather.snow}%
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            Temp: {weather.temp}degF
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            R-Feel: {weather.realFeel}degF
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            Wind: {weather.wind}mph
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            Gusts: {weather.gust}mph
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            Wind Dir: {weather.windDirection}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Typography fontSize={"small"}>
                            UV: {weather.uV}
                        </Typography>
                    </Grid>
                </Grid>
                {weather && weather?.alerts?.length > 0 && <WeatherAlerts />}
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button size="small" onClick={() => clickHandler()}>
                        Update Weather
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );

    return (
        <Box>
            <Grid container spacing={1} sx={{ maxWidth: "100%" }}>
                {weather && (
                    <Grid item xs={12} sm={6}>
                        <Paper
                            elevation={2}
                            sx={{ height: "100%", marginLeft: 1 }}
                        >
                            <WeatherCard />
                        </Paper>
                    </Grid>
                )}
                <Grid item xs={12} sm={6}>
                    <Paper elevation={2} sx={{ height: "100%", marginLeft: 1 }}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ minHeight: "300px", height: "100%"}}>
                                {/* <Typography gutterBottom variant="h6">
                                    Map
                                </Typography> */}
                                <Map
                                    center={center}
                                    zoom={zoom}
                                    metaWheelZoom={true}
                                    onBoundsChanged={({ center, zoom }) => { 
                                        setCenter(center);
                                        setZoom(zoom);
                                    }} 
                                >
                                    <Marker
                                        width={40}
                                        anchor={[lat || 32.7555, lng || -97.309341]}
                                    />
                                    <ZoomControl />
                                </Map>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Widget;

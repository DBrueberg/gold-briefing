// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - App.js
// December 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/22/2022, Added in Router for SPA page navigation)
//  (DAB, 12/27/2022, Added in ThemeProvider and LocalizationProvider)

import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";
import JobBriefing from "./components/views/JobBriefing";
import { Box, CssBaseline } from "@mui/material";
import MainNav from "./components/subComponent/MainNav";

// MUI Settings to use a dark style theme
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

// MUI Settings to use a light style theme
const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

/**
 * The main React Component that will allow for interaction with the Gold
 * Briefing application
 * 
 * @returns
 */
function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Box className="App">
                    <MainNav />
                    <JobBriefing />
                </Box>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;

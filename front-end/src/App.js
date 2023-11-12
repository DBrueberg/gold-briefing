// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - App.js
// December 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/22/2022, Added in Router for SPA page navigation)
//  (DAB, 12/27/2022, Added in ThemeProvider and LocalizationProvider)
//  (DAB, 11/02/2023, Added in Routes for BrowserRouter)
//  (DAB, 11/07/2023, Added in createAccount path)
//  (DAB, 11/09/2023, Added in Briefings path)

import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";
import JobBriefing from "./components/views/JobBriefing";
import Whoops404 from "./components/views/Whoops404";
import { Box, CssBaseline } from "@mui/material";
import Login from "./components/views/Login";
import CreateAccount from "./components/views/CreateAccount";
import Briefings from "./components/views/Briefings";

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
                    <Routes>
                        <Route exact path="/" element={<JobBriefing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/createAccount" element={<CreateAccount />} />
                        <Route path="/briefings" element={<Briefings />} />
                        <Route path="*" element={<Whoops404 />} />
                    </Routes>
                </Box>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;

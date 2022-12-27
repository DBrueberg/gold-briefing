// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - App.js
// December 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/22/2022, Added in Router for SPA page navigation)

import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";
import JobBriefing from "./components/views/JobBriefing";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <div className="App">
                    <h1>Future Home of Gold-Briefing!</h1>
                    <JobBriefing />
                </div>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;

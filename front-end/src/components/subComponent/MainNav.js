// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - MainNav.js
// December 27, 2022
// Last Edited (Initials, Date, Edits):

import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

/**
 * The main navigation for the Gold Briefing we application
 *
 * @returns
 */
function MainNav() {
    return (
        <AppBar position="sticky" component="nav">
            <Toolbar>
                <Stack
                    sx={{ flexGrow: 1 }}
                    spacing={1}
                    direction="row"
                    justifyContent={{ xs: "end" }}
                >
                    <Button component={Link} color="inherit" to="/">
                        Forms
                    </Button>
                    <Button component={Link} color="inherit" to="/login">
                        Login
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default MainNav;

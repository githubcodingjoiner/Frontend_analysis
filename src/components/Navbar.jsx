import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography sx={{ flexGrow: 1 }}>MyApp</Typography>
                <Button variant="contained" sx={{ mx: 1 }} href="/signup">
                    Signup
                </Button>
                <Button variant="contained" sx={{ mx: 1 }} href="/login">
                    Login
                </Button>
                <Button variant="contained" sx={{ mx: 1 }} href="/logout">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

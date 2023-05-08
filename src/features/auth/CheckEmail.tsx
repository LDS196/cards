import React from "react"
import { Box, Button, Container, CssBaseline, Paper, Typography } from "@mui/material"

import EmailIcon from "@mui/icons-material/Email"
import { NavLink } from "react-router-dom";

const CheckEmail = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: "10px" }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Check Email
                    </Typography>
                    <EmailIcon color={"primary"} />
                    <Typography align={"center"}>We've sent an Email with instructions to example@gmai.com</Typography>
                  <NavLink to={"/login"}>
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Back to login
                        </Button>
                  </NavLink>
                </Box>
            </Paper>
        </Container>
    )
}

export default CheckEmail

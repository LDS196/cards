import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { selectAppError } from "app/app.select"
import StyleIcon from "@mui/icons-material/Style"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { authThunks } from "features/auth/auth.slice"
import { useActions } from "common/hooks/useActions"
import { selectIsLoginIn } from "features/auth/auth.select"

const Header = () => {
    const isLoginIn = useSelector(selectIsLoginIn)

    const navigate = useNavigate()
    const { logout } = useActions(authThunks)
    const logoutHandler = () => {
        logout({})
            .unwrap()
            .then((res) => navigate("/login"))
    }

    const isLoading = useSelector(selectAppError)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <StyleIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cards
                    </Typography>
                    {isLoading ? (
                        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logoutHandler}>
                            Logout
                        </Button>
                    ) : (
                        <Link to={"/login"}>Login</Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

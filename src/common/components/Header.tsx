import { AppBar, Avatar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"

import { useSelector } from "react-redux"
import { selectAppError } from "app/app.select"
import StyleIcon from "@mui/icons-material/Style"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { authThunks } from "features/auth/auth.slice"
import { useActions } from "common/hooks/useActions"
import { selectIsLoginIn } from "features/auth/auth.select"
import { selectProfile } from "features/Profile/profile.select"

const Header = () => {
    const isLoginIn = useSelector(selectIsLoginIn)
    const userProfile = useSelector(selectProfile)
    const navigate = useNavigate()
    const { logout } = useActions(authThunks)
    const logoutHandler = async () => {
        await logout({})
        navigate("/login")
    }

    const isLoading = useSelector(selectAppError)
    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <StyleIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cards
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                        {userProfile?.name}
                    </Typography>
                    <Avatar alt="Avatar-user" src={userProfile?.avatar} sx={{ width: 46, height: 46, mr: 3 }} />
                    {isLoginIn ? (
                        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logoutHandler}>
                            Logout
                        </Button>
                    ) : (
                        <Link to={"/login"}>Login</Link>
                    )}
                </Toolbar>
                {isLoading && <LinearProgress />}
            </AppBar>
        </Box>
    )
}

export default Header

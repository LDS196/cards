import { AppBar, Avatar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { selectIsLoading } from "app/app.select"
import StyleIcon from "@mui/icons-material/Style"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { authThunks } from "features/auth/auth.slice"
import { useActions } from "common/hooks/useActions"
import { selectIsLoginIn } from "features/auth/auth.select"
import { selectProfile } from "features/Profile/profile.select"

export const Header = () => {
    const isLoading = useSelector(selectIsLoading)
    const isLoginIn = useSelector(selectIsLoginIn)
    const userProfile = useSelector(selectProfile)
    const navigate = useNavigate()
    const { logout } = useActions(authThunks)

    const logoutHandler = async () => {
        await logout({})
        navigate("/login")
    }

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
                    {isLoginIn && (
                        <Link to={"/profile"} style={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                                {userProfile?.name}
                            </Typography>
                            <Avatar alt="Avatar-user" src={userProfile?.avatar} sx={{ width: 46, height: 46, mr: 3 }} />
                        </Link>
                    )}

                    {isLoginIn ? (
                        <Button disabled={isLoading} variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logoutHandler}>
                            Logout
                        </Button>
                    ) : (
                        <Link to={"/login"}>Login</Link>
                    )}
                </Toolbar>
            </AppBar>
            <div style={{ height: "10px" }}>{isLoading && <LinearProgress />}</div>
        </Box>
    )
}

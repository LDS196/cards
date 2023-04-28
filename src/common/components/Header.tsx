import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { selectAppError } from "app/app.select"
import StyleIcon from "@mui/icons-material/Style"
import { Link } from "react-router-dom"

const Header = () => {
    const loginHandler = () => {}

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
                    <Link to={"/login"}>Login</Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
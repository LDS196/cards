import React from "react"
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
import { useNavigate } from "react-router-dom"
import { selectIsLoginIn } from "features/auth/auth.select"
import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/auth.slice"
import { useForm } from "react-hook-form"
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import s from "features/auth/Register/Register.module.scss"

const Profile = () => {
  const logoutHandler = () => {
  }
  const userProfile = useSelector(selectProfile)

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "10px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >

          <Typography component="h1" variant="h5">
            Personal information
          </Typography>
          <Avatar alt="Avatar-user" src={userProfile?.avatar}
                  sx={{ width: 86, height: 86, mt: 3,

                  }}  />


        </Box>

    </Paper>
</Container>
)
}

export default Profile

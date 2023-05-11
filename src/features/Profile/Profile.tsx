import React, { ChangeEvent, useState } from "react"
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
import s from "./Profile.module.scss"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/auth.slice"
import Back from "common/components/Back"
import { AddImageInputTypeFile } from "common/components/InputTypeFile/AddImageInputTypeFile"
import { selectIsLoading } from "app/app.select"
const Profile = () => {
    const isLoading = useSelector(selectIsLoading)
    const userProfile = useSelector(selectProfile)
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(userProfile?.name)
    const navigate = useNavigate()
    const { logout, changeProfileData } = useActions(authThunks)
    const logoutHandler = async () => {
        await logout({})
        navigate("/login")
    }

    const changeEditMode = () => {
        setEditMode(true)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const saveNameHandler = () => {
        changeProfileData({ name: inputValue })
            .unwrap()
            .then(() => setEditMode(false))
    }

    return (
        <div>
            <Back title={"Back to Packs List"} link={""} />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: "10px" }}>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Personal information
                        </Typography>

                        <AddImageInputTypeFile />
                        {editMode ? (
                            <div className={s.changeName}>
                                <TextField
                                    value={inputValue}
                                    margin="normal"
                                    fullWidth
                                    label="Name"
                                    placeholder={"Enter your new name"}
                                    onChange={onChangeInputHandler}
                                />
                                <Button
                                    disabled={isLoading}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={saveNameHandler}
                                >
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <Typography className={s.name} component="h6" variant="h6">
                                {userProfile?.name}
                                <EditOutlinedIcon aria-disabled={isLoading} sx={{ ml: 2 }} onClick={changeEditMode} />
                            </Typography>
                        )}

                        <Typography sx={{ mt: 2, color: "grey" }}>{userProfile?.email}</Typography>
                        <Button disabled={isLoading} variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logoutHandler}>
                            Logout
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default Profile

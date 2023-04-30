import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from "@mui/material"
import s from "./Login/Login.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/auth.slice"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
type UseFormType = {
    password: string
}
const SetNewPassword = () => {
    const [type, setType] = useState("password")

    const navigate = useNavigate()
    const { setNewPassword } = useActions(authThunks)
    const params = useParams()

    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm<UseFormType>({
        defaultValues: {
            password: "",
        },
        mode: "onChange",
    })

    const onSubmit = async (data: UseFormType) => {
        await setNewPassword({ ...data, resetPasswordToken: params.token })
        navigate("/login")
    }
    const changeType = (type: string, setType: (value: string) => void) => {
        if (type === "password") setType("text")
        else setType("password")
    }
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
                        Create new password
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1, maxWidth: "350px", width: "100%" }}
                    >
                        <div className={s.password}>
                            <TextField
                              {...register("password", {
                                  required: true,
                                  minLength: {
                                      value: 8,
                                      message: "Min length 8 symbols",
                                  },
                              })}
                              margin="normal"
                              fullWidth
                              name="password"
                              label="Password"
                              type={type}
                              id="password"
                            />
                            <RemoveRedEyeIcon className={s.showPassword} onClick={() => changeType(type, setType)}/>
                        </div>

                        <div className={s.error}>
                            {errors?.password && <p>{errors?.password?.message || "Error"}</p>}
                        </div>
                        <Typography>Create new password and we will send you further instructions to email</Typography>
                        <Button
                            disabled={!isDirty || !isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create new password
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default SetNewPassword

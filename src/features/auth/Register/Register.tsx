import React from "react"
import s from "./Register.module.scss"
import { authThunks } from "features/auth/auth.slice"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"
import { useActions } from "common/hooks/useActions"
import { useForm } from "react-hook-form"
import { LoginParamsType, RegisterParamsType } from "features/auth/auth.api"

import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { selectProfile } from "features/Profile/profile.select"
import { useNavigate } from "react-router-dom"
type UseFormType = {
    email: string
    password: string
    confirm_password: string
}
const Register = () => {
    const navigate = useNavigate()
    const isLoginIn = useSelector(selectIsLoginIn)
    const { register: registerThunk } = useActions(authThunks)
    const {
        register,
        watch,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm<UseFormType>({
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
        },
        mode: "onChange",
    })

    const onSubmit = (data: UseFormType) => {
        registerThunk({ email: data.email, password: data.password })
            .unwrap()
            .then((res) => {
                navigate("/login")
            })
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1, maxWidth: "350px", width: "100%" }}
                >
                    <TextField
                        {...register("email", {
                            required: "Required field",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email.",
                            },
                        })}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                    />
                    <div className={s.error}>{errors?.email && <p>{errors?.email?.message || "Error"}</p>}</div>
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
                        type="password"
                        id="password"
                    />
                    <div className={s.error}>{errors?.password && <p>{errors?.password?.message || "Error"}</p>}</div>

                    <TextField
                        {...register("confirm_password", {
                            required: true,
                            validate: (val: string) => {
                                if (watch("password") != val) {
                                    return "Your passwords do no match"
                                }
                            },
                        })}
                        margin="normal"
                        fullWidth
                        name="confirm_password"
                        label="Confirm password"
                        type="password"
                        id="password"
                    />
                    <div className={s.error}>
                        {errors?.confirm_password && <p>{errors?.confirm_password?.message || "Error"}</p>}
                    </div>
                    <Button
                        disabled={!isDirty || !isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
                </Paper>
        </Container>
    )
}

export default Register

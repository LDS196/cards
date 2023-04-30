import React, { useState } from "react"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import s from "../Login/Login.module.scss"
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material"

import { useForm } from "react-hook-form"
import { LoginParamsType } from "features/auth/auth.api"
import { useActions } from "common/hooks/useActions"
import { Copyright } from "common/components/Copyright"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"
import { authThunks } from "../auth.slice"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"

export const Login = () => {
    const [type, setType] = useState("password")
    const isLoginIn = useSelector(selectIsLoginIn)
    const { login } = useActions(authThunks)
    const {
        register,
        watch,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm<LoginParamsType>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: true,
        },
        mode: "onChange",
    })
    const changeType = (type: string, setType: (value: string) => void) => {
        if (type === "password") setType("text")
        else setType("password")
    }
    const onSubmit = (data: LoginParamsType) => login(data)

    if (isLoginIn) {
        return <Navigate to={"/"} />
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
                        Sign in
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
                        <FormControlLabel
                            control={<Checkbox {...register("rememberMe")} checked={watch("rememberMe")} />}
                            label="Remember Me"
                        />
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
                            <Grid item xs>
                                <Link href="/forgot-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Paper>
        </Container>
    )
}

import React from 'react'
import s from './Login/Login.module.scss'
import { useForm } from "react-hook-form"
import { Box, Button, Container, CssBaseline, Link, TextField, Typography } from "@mui/material"
import { Copyright } from "src/common/components/Copyright"
import { useActions } from "../../common/hooks/useActions"
import { authThunks } from "./auth.slice"





type UseFormType = {
    email: string
}
export const ForgotPassword = () => {
    const messageToEmail = `<div style="background-color: lime; padding: 15px">password recovery link: 
<a href="http://localhost:3000/#/set-new-password/$token$">link</a></div>`

    const { forgotPassword } = useActions(authThunks)

    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm<UseFormType>({
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    })

    const onSubmit = (data: UseFormType) => {
        console.log(data)
        forgotPassword({ ...data, message: messageToEmail })
    }

    return (
      <Container component="main" maxWidth="xs">
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
                    Forgot your password?
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
                    <Typography>Enter your email address and we will send you further instructions</Typography>
                    <Link href={"/check-email"}>
                        <Button
                            disabled={!isDirty || !isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send instructions
                        </Button>
                    </Link>
                </Box>
                <Typography>Did you remember your passport?</Typography>
                <Link href={"/login"}>
                    <Typography variant="body2">Try logging in</Typography>
                </Link>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

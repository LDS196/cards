import React from "react"
import { useForm } from "react-hook-form"
import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material"
import s from "./Login/Login.module.scss"
import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/auth.slice"

type UseFormType = {
    password: string
}
const SetNewPassword = () => {
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

    const onSubmit = (data: UseFormType) => console.log(data)

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
                    Create new password
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1, maxWidth: "350px", width: "100%" }}
                >
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
        </Container>
    )
}

export default SetNewPassword

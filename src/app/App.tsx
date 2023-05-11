import React, { useEffect } from "react"
import "app/App.css"
import { Route, Routes } from "react-router-dom"
import Register from "features/auth/Register/Register"
import CheckEmail from "features/auth/CheckEmail"
import SetNewPassword from "features/auth/SetNewPassword"
import Profile from "features/Profile/Profile"
import Packs from "features/Packs/Packs"
import { useSelector } from "react-redux"
import { selectIsAppInitialized } from "app/app.select"
import { CircularProgress } from "@mui/material"
import { Login } from "features/auth/Login/Login"
import { ForgotPassword } from "features/auth/ForgotPassword"
import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/auth.slice"
import { Header } from "common/components/Header"
import { Cards } from "features/Cards/Cards"
import LearnPage from "common/components/Learn/LearnPage"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import NotFound from "common/components/NotFound"
import { appActions } from "app/app.slice"

function App() {
    const isAppInitialized = useSelector(selectIsAppInitialized)
    const { initializeApp } = useActions(authThunks)
    const { setAppInitialized } = useActions(appActions)
    useEffect(() => {
        initializeApp({})
            .unwrap()
            .finally(() => {
                setAppInitialized({ isAppInitialized: true })
            })
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar />
            {!isAppInitialized ? (
                <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Header />
                    <Routes>
                        <Route path={"/"} element={<Packs />} />
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/register"} element={<Register />} />
                        <Route path={"/check-email"} element={<CheckEmail />} />
                        <Route path={"/set-new-password/:token"} element={<SetNewPassword />} />
                        <Route path={"/forgot-password"} element={<ForgotPassword />} />
                        <Route path={"/profile"} element={<Profile />} />
                        <Route path={"/cards/:id"} element={<Cards />} />
                        <Route path={"/learn"} element={<LearnPage />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                </>
            )}
        </div>
    )
}

export default App

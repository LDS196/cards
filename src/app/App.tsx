import React, { useEffect } from "react"
import "app/App.css"
import { Navigate, Route, Routes } from "react-router-dom";
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
import LearnPage from "features/Learn/LearnPage"

function App() {
    const isAppInitialized = useSelector(selectIsAppInitialized)
    const { initializeApp } = useActions(authThunks)
    useEffect(() => {
        initializeApp({})
    }, [])

    if (!isAppInitialized) {
        return (
            <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/check-email"} element={<CheckEmail />} />
                <Route path={"/set-new-password/:token"} element={<SetNewPassword />} />
                <Route path={"/forgot-password"} element={<ForgotPassword />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"/"} element={<Packs />} />
                <Route path={"/cards"} element={<Cards />} />
                <Route path={"/learn"} element={<LearnPage />} />
                <Route path={'*'} element={<Navigate to='/404'/>}/>
            </Routes>
        </div>
    )
}

export default App

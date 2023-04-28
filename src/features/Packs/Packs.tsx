import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"

const Packs = () => {
    const isLoginIn = useSelector(selectIsLoginIn)


    if (!isLoginIn) {
        return <Navigate to={"/"} />
    }
    return <div>Packs</div>
}

export default Packs

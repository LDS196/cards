import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"

const Packs = () => {
    const isLoginIn = useSelector(selectIsLoginIn)
    useEffect(() => {
        if (!isLoginIn) {
            return;
        }
       //fetch packs
    }, []);

    if (!isLoginIn) {
        return <Navigate to={"/login"} />;
    }
    return <div>Packs</div>
}

export default Packs

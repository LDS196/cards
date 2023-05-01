import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { selectPacks } from "features/Packs/packs.selector"
import { RootState } from "app/store"
import { BasicTable } from "features/Packs/BasicTable"
import { Paginator } from "common/components/Paginator/Paginator"
import { Typography } from "@mui/material"




const Packs = () => {
    const pageCount = useSelector((state:RootState)=>state.packs.pageCount)
    const packs = useSelector(selectPacks)
    const cardPacksTotalCount = useSelector((state:RootState)=> state.packs.cardPacksTotalCount)
    const { getPacks } = useActions(packsThunks)

    const isLoginIn = useSelector(selectIsLoginIn)
    useEffect(() => {
        if (!isLoginIn) {
            return
        }
        //fetch packs
        getPacks({params:{ pageCount }})

    }, [])

    if (!isLoginIn) {
        return <Navigate to={"/login"} />
    }
    return <div>
        <div>
            <Typography component="h1" variant="h5">
                Pack List
            </Typography>
        </div>
       <BasicTable/>
        <Paginator/>

    </div>
}

export default Packs

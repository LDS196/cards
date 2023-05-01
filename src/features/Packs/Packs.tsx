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
import { Button, Typography } from "@mui/material"
import s from "./Packs.module.scss"
import { Search } from "common/components/Search/Search"

const Packs = () => {
    const pageCount = useSelector((state: RootState) => state.packs.pageCount)
    const packs = useSelector(selectPacks)
    const cardPacksTotalCount = useSelector((state: RootState) => state.packs.cardPacksTotalCount)
    const { getPacks } = useActions(packsThunks)

    const isLoginIn = useSelector(selectIsLoginIn)
    useEffect(() => {
        if (!isLoginIn) return
        getPacks({ params: { pageCount } })
    }, [])

    if (!isLoginIn) {
        return <Navigate to={"/login"} />
    }
    return (
        <div>
            <div className={s.block}>
                <Typography component="h1" variant="h5">
                    Pack List
                </Typography>
                <Button variant="contained">Add new pack</Button>
            </div>
            <div className={s.block}>
                <Search />
            </div>
            <BasicTable />
            <Paginator />
        </div>
    )
}

export default Packs

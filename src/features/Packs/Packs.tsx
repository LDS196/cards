import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { BasicTable } from "features/Packs/BasicTable"
import { Paginator } from "common/components/Paginator/Paginator"
import { Button, Typography } from "@mui/material"
import s from "./Packs.module.scss"
import { Search } from "common/components/Search/Search"
import ChooseAuthor from "common/components/ChooseAuthor/ChooseAuthor"
import { selectFilter } from "features/Filter/filter.selector"
import {  selectPage, selectPageCount } from "features/Packs/packs.selector"
import { RangeSlider } from "common/components/RengeSlider/RangeSlider"

const Packs = () => {
    const { packName, user_id, block,min,max } = useSelector(selectFilter)
    const pageCount = useSelector(selectPageCount)
    const page = useSelector(selectPage)
    const { getPacks } = useActions(packsThunks)
    const isLoginIn = useSelector(selectIsLoginIn)
    useEffect(() => {
        console.log("get packs")
        getPacks({
            params: {
                pageCount,
                page,
                packName,
                max,
                min,
                user_id,
                block,
            },
        })
    }, [pageCount, page, packName, min,max, user_id, block])

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
                <ChooseAuthor />
                <RangeSlider />
            </div>
            <BasicTable />
            <Paginator />
        </div>
    )
}

export default Packs

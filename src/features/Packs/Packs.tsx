import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoginIn } from "features/auth/auth.select"
import { useActions } from "common/hooks/useActions"
import { packsActions, packsThunks } from "features/Packs/packs.slise"
import { BasicTable } from "features/Packs/BasicTable"
import { Paginator } from "common/components/Paginator/Paginator"
import { Button, Typography } from "@mui/material"
import s from "./Packs.module.scss"
import { Search } from "common/components/Search/Search"
import ChooseAuthor from "common/components/ChooseAuthor/ChooseAuthor"
import { selectFilter } from "features/Filter/filter.selector"
import { selectPageCount } from "features/Packs/packs.selector"
import { RangeSlider } from "common/components/RengeSlider/RangeSlider"
import { ModalAddPack } from "common/components/ModalPack/ModalAddPack"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import { filterActions } from "features/Filter/filter.slice"
import { RootState } from "app/store"
import { selectIsLoading } from "app/app.select"

const Packs = () => {
    const isLoading = useSelector(selectIsLoading)
    const { cardPacksTotalCount, page } = useSelector((state: RootState) => state.packs)
    const { changePageSize, changePage } = useActions(packsActions)
    const { packName, user_id, block, min, max, sortBy } = useSelector(selectFilter)
    const pageCount = useSelector(selectPageCount)
    const { getPacks } = useActions(packsThunks)
    const { clearFilter } = useActions(filterActions)
    const isLoginIn = useSelector(selectIsLoginIn)
    const [isShow, setIsShow] = useState(false)
    const { setSearchValue } = useActions(filterActions)
    const showModalAddPack = () => {
        setIsShow(true)
    }
    const hideModalAddPack = () => {
        setIsShow(false)
    }
    const clearFilterHandler = () => {
        clearFilter({
            packName: "",
            max: undefined,
            min: undefined,
            user_id: "",
            block: false,
            sortBy: {
                name: "",
                sortType: "",
            },
        })
    }

    useEffect(() => {
        getPacks({})
    }, [pageCount, page, packName, min, max, user_id, block, sortBy])

    if (!isLoginIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <div>
            <div className={s.block}>
                <Typography component="h1" variant="h5">
                    Pack List
                </Typography>
                <Button disabled={isLoading} onClick={() => showModalAddPack()} variant="contained">
                    Add new pack
                </Button>
            </div>
            <div className={s.block}>
                <Search changePage={changePage} searchName={packName} setSearchValue={setSearchValue} />
                <ChooseAuthor />
                <RangeSlider />
                <button onClick={clearFilterHandler} style={{ padding: "5px", marginTop: "24px" }}>
                    <FilterAltOffIcon color={"primary"} />
                </button>
            </div>
            <BasicTable />
            <Paginator
                totalCount={cardPacksTotalCount}
                page={page}
                changePage={changePage}
                changePageSize={changePageSize}
            />
            {isShow && <ModalAddPack hideModalAddPack={hideModalAddPack} />}
        </div>
    )
}

export default Packs

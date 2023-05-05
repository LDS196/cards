import React, { useState } from "react"
import { Button, Typography } from "@mui/material"
import s from "./ChooseAuthor.module.scss"
import { useSelector } from "react-redux"
import { selectUserId } from "features/Profile/profile.select"
import { useActions } from "common/hooks/useActions"
import { filterActions } from "features/Filter/filter.slice"

const ChooseAuthor = () => {
    const userId = useSelector(selectUserId)
    const { setUserId } = useActions(filterActions)
    const [activeButton, setActiveButton] = useState("outlined")
    const showMyPacks = () => {
        if (userId) {
            setUserId(userId)
            setActiveButton("contained")
        }
    }
    const showAllPacks = () => {
        setActiveButton("outlined")
        setUserId("")
    }
    return (
        <div>
            <Typography component="p" sx={{ fontSize: "18px" }}>
                Show packs cards
            </Typography>
            <div className={s.buttons}>
                <Button variant={activeButton === "outlined" ? "outlined" : "contained"} onClick={showMyPacks}>
                    My
                </Button>
                <Button variant={activeButton === "outlined" ? "contained" : "outlined"} onClick={showAllPacks}>
                    All
                </Button>
            </div>
        </div>
    )
}

export default ChooseAuthor

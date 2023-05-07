import React, { useState } from "react"
import { Button, Typography } from "@mui/material"
import s from "./ChooseAuthor.module.scss"
import { useSelector } from "react-redux"
import { selectUserId } from "features/Profile/profile.select"
import { useActions } from "common/hooks/useActions"
import { filterActions } from "features/Filter/filter.slice"
import { selectIsLoading } from "app/app.select"

const ChooseAuthor = () => {
    const isLoading = useSelector(selectIsLoading)
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
                <Button
                    disabled={isLoading}
                    variant={activeButton === "outlined" ? "outlined" : "contained"}
                    onClick={showMyPacks}
                >
                    My
                </Button>
                <Button
                    disabled={isLoading}
                    variant={activeButton === "outlined" ? "contained" : "outlined"}
                    onClick={showAllPacks}
                >
                    All
                </Button>
            </div>
        </div>
    )
}

export default ChooseAuthor

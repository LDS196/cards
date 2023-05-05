import React, { FC } from "react"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

type PropsType = {
    link: string
    title: string
    clearFilterHandler?: () => void
}
const Back: FC<PropsType> = ({ link, title, clearFilterHandler }) => {
    const style = {
        display: "flex",
        alignItems: "center",
        gap: "0 10px",
        margin: "20px 0",
    }
    return (
        <Link to={`/${link}`} style={style}>
            <Button variant="outlined" onClick={clearFilterHandler}>
                <KeyboardBackspaceIcon />
                {title}
            </Button>
        </Link>
    )
}

export default Back

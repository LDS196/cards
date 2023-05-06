import React, { ChangeEvent, FC, useState } from "react"
import { Button, Typography } from "@mui/material"

import defaultCover from "../../../assets/img/cover.jpg"
import s from "../../components/InputTypeFile/InputTypeFile.module.scss"

type PropsType = {
    title: string
    nameButton: string
    callback: (value: string) => void
    cover: string | undefined
}
export const InputTypeFile: FC<PropsType> = (props) => {
    const { title, cover, nameButton, callback } = props

    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 700000) {
                convertFileToBase64(file, (file64: string) => {
                    if (!isAvaBroken) {
                        callback(file64)
                    }
                })
            } else {
                alert("Файл слишком большого размера.Max 700 KB")
                console.error("Error: ", "Файл слишком большого размера.Max 700 KB")
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert("Кривая картинка")
    }

    return (
        <div className={s.cover}>
            <label className={s.label}>
                <input type="file" accept="image/*" onChange={uploadHandler} style={{ display: "none" }} />
                <Button size={"small"} variant="contained" component="span">
                    {nameButton}
                </Button>
                <Typography component="p" sx={{ fontSize: "16px" }}>
                    {title}
                </Typography>
            </label>
            <div className={s.coverImg}>
                <img src={cover?.length !== 0 ? cover : defaultCover} onError={errorHandler} alt="ava" />
            </div>
        </div>
    )
}

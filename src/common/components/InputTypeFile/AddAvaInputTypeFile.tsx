import React, { ChangeEvent, useEffect, useState } from "react"
import { Avatar, IconButton } from "@mui/material"
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import s from "features/Profile/Profile.module.scss"
import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/auth.slice"
import defaultAva from "../../../assets/img/user.png"

export const AddAvaInputTypeFile = () => {
    const { changeProfileData } = useActions(authThunks)
    const userProfile = useSelector(selectProfile)

    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 1000000) {
                convertFileToBase64(file, (file64: string) => {
                    if (!isAvaBroken) {
                        changeProfileData({ avatar: file64 })
                    }
                })
            } else {
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
        <div className={s.avatar}>
            <Avatar
                onError={errorHandler}
                alt="Avatar-user"
                src={userProfile?.avatar.length !== 0 ? userProfile?.avatar : defaultAva}
                sx={{ width: 106, height: 106 }}
            />
            <label className={s.icon}>
                <input type="file" accept="image/*" onChange={uploadHandler} style={{ display: "none" }} />
                <IconButton component="span">
                    <AddAPhotoOutlinedIcon />
                </IconButton>
            </label>
        </div>
    )
}

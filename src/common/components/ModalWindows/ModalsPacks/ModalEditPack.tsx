import React, { FC, useState } from "react"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "common/components/ModalWindows/Modal.module.scss"
import { useForm } from "react-hook-form"

import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { PackType } from "features/Packs/packs.api"
import { InputTypeFile } from "common/components/InputTypeFile/InputTypeFile"
import { useSelector } from "react-redux"
import { selectIsLoading } from "app/app.select"

type PropsType = {
    hideModalUpdatePack: () => void
    pack: PackType
}
type FormType = {
    name: string
    private: boolean
}
export const ModalEditPack: FC<PropsType> = (props) => {
    const isLoading = useSelector(selectIsLoading)
    const { hideModalUpdatePack, pack } = props
    const { updatePack } = useActions(packsThunks)
    const [cover, setCover] = useState(pack.deckCover)
    const setCoverHandler = (value: string) => {
        setCover(value)
    }
    const {
        register,
        watch,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm<FormType>({
        defaultValues: {
            name: pack.name,
            private: false,
        },
        mode: "onChange",
    })

    const onSubmit = (data: FormType) => {
        updatePack({
            cardsPack: {
                _id: pack._id,
                name: data.name,
                deckCover: cover,
            },
        })
            .unwrap()

            .then(() => hideModalUpdatePack())
    }
    return (
        <div className={s.modalWrapper}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: "350px",
                    width: "100%",
                }}
            >
                <div className={s.modal}>
                    <div className={s.title}>
                        <Typography component="p" sx={{ fontSize: "18px" }}>
                            Edit pack
                        </Typography>
                        <button onClick={hideModalUpdatePack}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div style={{ padding: "0 20px" }}>
                        <InputTypeFile
                            cover={cover}
                            title={"Cover"}
                            nameButton={"Change Cover"}
                            callback={setCoverHandler}
                        />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                        <TextField
                            {...register("name", {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: "Min length 3 symbols",
                                },
                            })}
                            fullWidth
                            id="standard-multiline-flexible"
                            label="Name pack"
                            multiline
                            maxRows={2}
                            variant="standard"
                            name={"name"}
                            type={"text"}
                        />
                        <div className={s.error}>{errors?.name && <p>{errors?.name?.message || "Error"}</p>}</div>

                        <FormControlLabel
                            control={<Checkbox {...register("private")} checked={watch("private")} />}
                            label="Private"
                        />
                        <div className={s.modalButtons}>
                            <Button
                                disabled={isLoading}
                                onClick={hideModalUpdatePack}
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={!isDirty || !isValid || isLoading}
                                type="submit"
                                color={"primary"}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    )
}

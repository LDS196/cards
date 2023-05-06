import React, { FC, useState } from "react"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "common/components/ModalPack/Modal.module.scss"
import { useForm } from "react-hook-form"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { InputTypeFile } from "common/components/InputTypeFile/InputTypeFile"

type PropsType = {
    showModalAddPack: () => void
}
type FormType = {
    name: string
    private: boolean
}
export const ModalAddPack: FC<PropsType> = ({ showModalAddPack }) => {
    const [cover, setCover] = useState("")
    const { createPack } = useActions(packsThunks)
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
            name: "",
            private: false,
        },
        mode: "onChange",
    })
    const onSubmit = (data: FormType) => {
        createPack({
            cardsPack: {
                name: data.name,
                private: data.private,
                deckCover: cover,
            },
        })
            .unwrap()
            .then(() => showModalAddPack())
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
                            Add new pack
                        </Typography>
                        <button onClick={showModalAddPack}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div style={{padding:'0 20px'}}>
                        <InputTypeFile cover={cover} title={"Cover"} nameButton={"Add Cover"} callback={setCoverHandler} />
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
                            <Button onClick={showModalAddPack} variant="outlined" sx={{ mt: 3, mb: 2 }}>
                                Cancel
                            </Button>
                            <Button
                                disabled={!isDirty || !isValid}
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

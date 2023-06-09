import React, { FC } from "react"
import { Button, Paper, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "common/components/ModalWindows/Modal.module.scss"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { PackType } from "features/Packs/packs.api"
import { useSelector } from "react-redux"
import { selectIsLoading } from "app/app.select"

type PropsType = {
    hideModalDeletePack: () => void
    pack: PackType
}

export const ModalDeletePack: FC<PropsType> = ({ hideModalDeletePack, pack }) => {
    const isLoading = useSelector(selectIsLoading)

    const { deletePack } = useActions(packsThunks)
    const deletePackHandler = () => {
        deletePack({ id: pack._id })
            .unwrap()
            .then(() => hideModalDeletePack())
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
                            Delete pack
                        </Typography>
                        <button onClick={hideModalDeletePack}>
                            <CloseIcon />
                        </button>
                    </div>
                    <form className={s.form}>
                        <Typography component="p" sx={{ fontSize: "16px" }}>
                            Do you really want to remove pack <b>{pack.name}?</b>
                            All cards will be deleted.
                        </Typography>
                        <div className={s.modalButtons}>
                            <Button
                                disabled={isLoading}
                                onClick={hideModalDeletePack}
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={deletePackHandler}
                                color={"error"}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Delete
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    )
}

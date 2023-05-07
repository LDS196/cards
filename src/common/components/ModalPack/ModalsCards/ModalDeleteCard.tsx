import React, { FC } from "react"
import { Button, Paper, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "common/components/ModalPack/Modal.module.scss"
import { useActions } from "common/hooks/useActions"
import { CardType } from "features/Cards/cards.api"
import { cardsThunks } from "features/Cards/cards.slice"
import { useSelector } from "react-redux"
import { selectIsLoading } from "app/app.select"

type PropsType = {
    hideModalDeleteCard: () => void
    card: CardType
}

export const ModalDeleteCard: FC<PropsType> = ({ hideModalDeleteCard, card }) => {
    const isLoading = useSelector(selectIsLoading)

    const { deleteCard, getCards } = useActions(cardsThunks)
    const deletePackHandler = () => {
        deleteCard({ id: card._id })
            .unwrap()
            .then(() => getCards({}))
            .then(() => hideModalDeleteCard())
    }
    return (
        <div className={s.modalWrapper}>
            <Paper elevation={3} sx={{ maxWidth: "350px", width: "100%" }}>
                <div className={s.modal}>
                    <div className={s.title}>
                        <Typography component="p" sx={{ fontSize: "18px" }}>
                            Delete Card
                        </Typography>
                        <button onClick={hideModalDeleteCard}>
                            <CloseIcon />
                        </button>
                    </div>
                    <form className={s.form}>
                        <Typography component="p" sx={{ fontSize: "16px" }}>
                            Do you really want to remove card?
                        </Typography>
                        <div className={s.modalButtons}>
                            <Button
                                disabled={isLoading}
                                onClick={hideModalDeleteCard}
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

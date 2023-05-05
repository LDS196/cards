import React, { FC } from "react"
import { Button, Paper, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "common/components/ModalPack/Modal.module.scss"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { PackType } from "features/Packs/packs.api"
import { CardType } from "features/Cards/cards.api"

type PropsType = {
    showModalDeleteCard: () => void
    card: CardType
}

export const ModalDeleteCard: FC<PropsType> = ({ showModalDeleteCard, card }) => {
    // const { deletePack } = useActions(packsThunks)
    // const deletePackHandler = () => {
    //     deletePack({ id: pack._id })
    //         .unwrap()
    //         .then(() => showModalDeletePack)
    // }
    return (
        <div></div>
        // <div className={s.modalWrapper}>
        //     <Paper
        //         elevation={3}
        //         sx={{
        //             maxWidth: "350px",
        //             width: "100%",
        //         }}
        //     >
        //         <div className={s.modal}>
        //             <div className={s.title}>
        //                 <Typography component="p" sx={{ fontSize: "18px" }}>
        //                     Delete pack
        //                 </Typography>
        //                 <button onClick={showModalDeletePack}>
        //                     <CloseIcon />
        //                 </button>
        //             </div>
        //             <form className={s.form}>
        //                 <Typography component="p" sx={{ fontSize: "16px" }}>
        //                     Do you really want to remove pack <b>{pack.name}?</b>
        //                     All cards will be deleted.
        //                 </Typography>
        //             <div className={s.modalButtons}>
        //                 <Button onClick={showModalDeletePack} variant="outlined" sx={{ mt: 3, mb: 2 }}>
        //                     Cancel
        //                 </Button>
        //                 <Button onClick={deletePackHandler} color={"error"} variant="contained" sx={{ mt: 3, mb: 2 }}>
        //                     Delete
        //                 </Button>
        //             </div>
        //                 </form>
        //         </div>
        //     </Paper>
        // </div>
    )
}

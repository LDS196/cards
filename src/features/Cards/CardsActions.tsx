import * as React from "react"
import { FC, useState } from "react"
import s from "../Packs/Packs.module.scss"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
import { CardType } from "features/Cards/cards.api"
import { ModalEditCard } from "common/components/ModalPack/ModalsCards/ModalEditCard"
import { ModalDeleteCard } from "common/components/ModalPack/ModalsCards/ModalDeleteCard"

type PropsType = {
    card: CardType
}
export const CardsActions: FC<PropsType> = ({ card }) => {
    const [isShowUpdateModalCard, setIsShowUpdateModalCard] = useState(false)
    const [isShowDeleteModalCard, setIsShowDeleteModalCard] = useState(false)

    const showModalUpdateCard = () => {
        setIsShowUpdateModalCard((prevState) => !prevState)
    }
    const showModalDeleteCard = () => {
        setIsShowDeleteModalCard((prevState) => !prevState)
    }
    return (
        <div>
            {isShowUpdateModalCard && <ModalEditCard card={card} showModalUpdateCard={showModalUpdateCard} />}
            {isShowDeleteModalCard && <ModalDeleteCard card={card} showModalDeleteCard={showModalDeleteCard} />}
            <ul className={s.block}>
                <li>
                    <button className={s.buttonEdit} onClick={showModalUpdateCard}>
                        <BorderColorIcon fontSize={"small"} />
                    </button>
                </li>
                <li>
                    <button className={s.buttonEdit} onClick={showModalDeleteCard}>
                        <DeleteIcon fontSize={"small"} />
                    </button>
                </li>
            </ul>
        </div>
    )
}

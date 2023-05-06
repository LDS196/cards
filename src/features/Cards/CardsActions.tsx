import * as React from "react"
import { FC, useState } from "react"
import s from "../Packs/Packs.module.scss"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import DeleteIcon from "@mui/icons-material/Delete"
import { CardType } from "features/Cards/cards.api"
import { ModalDeleteCard } from "common/components/ModalPack/ModalsCards/ModalDeleteCard"
import { ModalEditCard } from "common/components/ModalPack/ModalsCards/ModalEditCard"

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
        console.log('del')
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

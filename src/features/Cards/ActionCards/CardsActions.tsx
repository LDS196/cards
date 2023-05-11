import * as React from "react"
import { FC, useState } from "react"
import s from "features/Packs/Packs.module.scss"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import DeleteIcon from "@mui/icons-material/Delete"
import { CardType } from "features/Cards/cards.api"
import { ModalDeleteCard } from "common/components/ModalWindows/ModalsCards/ModalDeleteCard"
import { ModalEditCard } from "common/components/ModalWindows/ModalsCards/ModalEditCard"
import { useSelector } from "react-redux"
import { selectIsLoading } from "app/app.select"

type PropsType = {
    card: CardType
}
export const CardsActions: FC<PropsType> = ({ card }) => {
    const isLoading = useSelector(selectIsLoading)
    const [isShowUpdateModalCard, setIsShowUpdateModalCard] = useState(false)
    const [isShowDeleteModalCard, setIsShowDeleteModalCard] = useState(false)

    const showModalUpdateCard = () => {
        setIsShowUpdateModalCard(true)
    }
    const hideModalUpdateCard = () => {
        setIsShowUpdateModalCard(false)
    }
    const showModalDeleteCard = () => {
        setIsShowDeleteModalCard((prevState) => !prevState)
    }
    const hideModalDeleteCard = () => {
        setIsShowDeleteModalCard((prevState) => !prevState)
    }
    return (
        <div>
            {isShowUpdateModalCard && <ModalEditCard card={card} hideModalUpdateCard={hideModalUpdateCard} />}
            {isShowDeleteModalCard && <ModalDeleteCard card={card} hideModalDeleteCard={hideModalDeleteCard} />}
            <ul className={s.block}>
                <li>
                    <button disabled={isLoading} className={s.buttonEdit} onClick={showModalUpdateCard}>
                        <BorderColorIcon fontSize={"small"} />
                    </button>
                </li>
                <li>
                    <button disabled={isLoading} className={s.buttonEdit} onClick={showModalDeleteCard}>
                        <DeleteIcon fontSize={"small"} />
                    </button>
                </li>
            </ul>
        </div>
    )
}

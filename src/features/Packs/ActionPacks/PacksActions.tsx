import * as React from "react"
import { PackType } from "features/Packs/packs.api"
import { FC, useState } from "react"
import s from "features/Packs/ActionPacks/Actions.module.scss"
import SchoolIcon from "@mui/icons-material/School"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
import { ModalEditPack } from "common/components/ModalWindows/ModalsPacks/ModalEditPack"
import { ModalDeletePack } from "common/components/ModalWindows/ModalsPacks/ModalDeletePack"
import { useNavigate } from "react-router-dom"
import { useActions } from "common/hooks/useActions"
import { cardsActions } from "features/Cards/cards.slice"
import { selectIsLoading } from "app/app.select"

type PropsType = {
    pack: PackType
}
export const PacksActions: FC<PropsType> = ({ pack }) => {
    const isLoading = useSelector(selectIsLoading)
    const { setCardsPack_Id, setCurrentPackName } = useActions(cardsActions)
    const navigate = useNavigate()
    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const cardsCount = pack.cardsCount
    const userProfile = useSelector(selectProfile)
    const showModalUpdatePack = () => {
        setIsShowUpdateModal(true)
    }
    const hideModalUpdatePack = () => {
        setIsShowUpdateModal(false)
    }
    const showModalDeletePack = () => {
        setIsShowDeleteModal(true)
    }
    const hideModalDeletePack = () => {
        setIsShowDeleteModal(false)
    }
    const goToLearn = () => {
        setCurrentPackName(pack.name)
        setCardsPack_Id(pack._id)
        navigate("/learn")
    }
    return (
        <div>
            {isShowUpdateModal && <ModalEditPack pack={pack} hideModalUpdatePack={hideModalUpdatePack} />}
            {isShowDeleteModal && <ModalDeletePack pack={pack} hideModalDeletePack={hideModalDeletePack} />}
            <ul className={s.block}>
                <li>
                    <button className={s.buttonEdit} disabled={cardsCount === 0 || isLoading} onClick={goToLearn}>
                        <SchoolIcon fontSize={"small"} />
                    </button>
                </li>
                <li>
                    <button disabled={isLoading} className={s.buttonEdit} onClick={showModalUpdatePack}>
                        {userProfile?._id === pack.user_id && <BorderColorIcon fontSize={"small"} />}
                    </button>
                </li>
                <li>
                    <button disabled={isLoading} className={s.buttonEdit} onClick={showModalDeletePack}>
                        {userProfile?._id === pack.user_id && <DeleteIcon fontSize={"small"} />}
                    </button>
                </li>
            </ul>
        </div>
    )
}

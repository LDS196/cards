import * as React from "react"
import { PackType } from "features/Packs/packs.api"
import { FC, useState } from "react"
import s from './EditPack.module.scss'
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"

import { ModalEditPack } from "common/components/ModalPack/ModalEditPack"
import { ModalDeletePack } from "common/components/ModalPack/ModalDeletePack"

type PropsType ={
  pack:PackType
}
export const EditPack: FC<PropsType> = ({pack,}) => {
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const cardsCount = pack.cardsCount
  const userProfile = useSelector(selectProfile)
  const showModalUpdatePack = () => {
    setIsShowUpdateModal((prevState) => !prevState)
  }
  const showModalDeletePack = () => {
    setIsShowDeleteModal((prevState) => !prevState)
  }
    return (
        <div>
          {isShowUpdateModal && <ModalEditPack
            pack={pack}
            showModalUpdatePack={showModalUpdatePack}/>}
          {isShowDeleteModal && <ModalDeletePack
            pack={pack}
            showModalDeletePack={ showModalDeletePack}/>}
            <ul className={s.block}>
                <li>
                    <button className={s.buttonEdit} disabled={cardsCount === 0}>
                        <SchoolIcon fontSize={"small"} />
                    </button>
                </li>
                <li>
                    <button className={s.buttonEdit} onClick={showModalUpdatePack}>
                        {userProfile?._id === pack.user_id && <BorderColorIcon fontSize={"small"} />}
                    </button>
                </li>
                <li>
                    <button className={s.buttonEdit} onClick={showModalDeletePack}>
                        {userProfile?._id === pack.user_id && <DeleteIcon fontSize={"small"} />}
                    </button>
                </li>
            </ul>
        </div>
    )
}
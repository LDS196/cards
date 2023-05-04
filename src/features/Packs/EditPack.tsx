import * as React from "react"
import { PackType } from "features/Packs/packs.api"
import { FC, useState } from "react"
import s from './EditPack.module.scss'
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
import { useActions } from "common/hooks/useActions"
import { packsThunks } from "features/Packs/packs.slise"
import { ModalEditPack } from "common/components/ModalPack/ModalEditPack"
type PropsType ={
  pack:PackType

}
export const EditPack: FC<PropsType> = ({pack,}) => {
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false)
  const {deletePack}=useActions(packsThunks)
  const cardsCount = pack.cardsCount
  const userProfile = useSelector(selectProfile)
  const showModalUpdatePack = () => {
    setIsShowUpdateModal((prevState) => !prevState)
  }
    return (
        <div>
          {isShowUpdateModal && <ModalEditPack
            pack={pack}
            showModalUpdatePack={showModalUpdatePack}/>}

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
                    <button className={s.buttonEdit} onClick={() => deletePack({ id: pack._id })}>
                        {userProfile?._id === pack.user_id && <DeleteIcon fontSize={"small"} />}
                    </button>
                </li>
            </ul>
        </div>
    )
}
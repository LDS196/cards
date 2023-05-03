import * as React from "react"
import { PackType } from "features/Packs/packs.api"
import { FC } from "react"
import s from './EditPack.module.scss'
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux"
import { selectProfile } from "features/Profile/profile.select"
type PropsType ={
  pack:PackType
}
export const EditPack: FC<PropsType> = ({pack}) => {
  const cardsCount = pack.cardsCount
  const userProfile = useSelector(selectProfile)
    return (
        <ul className={s.block}>
            <li>
              <button className={s.buttonEdit} disabled={cardsCount===0}>
                <SchoolIcon fontSize={"small"} />
              </button>

            </li>
            <li>
              <button className={s.buttonEdit}>
              {
                userProfile?._id === pack.user_id && <BorderColorIcon fontSize={"small"}/>
              }
              </button>
            </li>
            <li>
              <button className={s.buttonEdit}>
              {
                userProfile?._id === pack.user_id && <DeleteIcon fontSize={"small"}/>
              }
              </button>
            </li>
        </ul>
    )
}